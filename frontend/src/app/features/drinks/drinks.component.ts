import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Drink } from 'src/app/core/models/drink.model';
import { DrinkService } from 'src/app/core/services/drink.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ConfirmDeleteDrinkDialogComponent } from '../confirm-delete-drink-dialog/confirm-delete-drink-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];
  dataSource = new MatTableDataSource<Drink>([]);
  displayedColumns: string[] = ['name', 'price', 'image', 'actions'];

  drinkForm: FormGroup;
  editingDrink: Drink | null = null;
  dialogRef!: MatDialogRef<any>;

  selectedFile!: File;
  previewImage!: string;

  @ViewChild('drinkDialog') drinkDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private drinkService: DrinkService,
    private snackBar: MatSnackBar,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.drinkForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.loadDrinks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // -------------------- Charger tous les drinks --------------------
  loadDrinks() {
    this.drinkService.getAllDrinks().subscribe({
      next: (data) => {
        this.drinks = data;
        this.dataSource.data = this.drinks;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => console.error('Erreur API:', err),
    });
  }

  // -------------------- Ouvrir le dialog --------------------
  openDialog(drink?: Drink) {
    this.editingDrink = drink || null;

    if (drink) {
      this.drinkForm.patchValue({
        name: drink.name,
        price: drink.price,
        image: drink.image,
      });
      this.previewImage = drink.image;
    } else {
      this.resetForm();
    }

    this.dialogRef = this.dialog.open(this.drinkDialog);
  }

  // -------------------- Fichier sélectionné --------------------
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // -------------------- Submit avec upload --------------------
  submitForm() {
    if (this.selectedFile) {
      this.fileUploadService.uploadImage(this.selectedFile).subscribe({
        next: (url: string) => {
          this.drinkForm.patchValue({ image: url });
          this.saveDrink();
        },
        error: (err) => console.error('Erreur upload:', err),
      });
    } else {
      this.saveDrink();
    }
  }

  // -------------------- Enregistrer le drink --------------------
  private saveDrink() {
    const drinkData = this.drinkForm.value;

    if (this.editingDrink) {
      this.drinkService
        .updateDrink(this.editingDrink.id!, drinkData)
        .subscribe({
          next: () => {
            this.loadDrinks();
            this.dialogRef.close();
            this.resetForm();
          },
          error: (err) => console.error('Erreur update:', err),
        });
    } else {
      this.drinkService.createDrink(drinkData).subscribe({
        next: () => {
          this.loadDrinks();
          this.dialogRef.close();
          this.resetForm();
        },
        error: (err) => console.error('Erreur create:', err),
      });
    }
  }

  // -------------------- Supprimer un drink --------------------
  deleteDrink(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDrinkDialogComponent, {
      width: '400px',
      data: { name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.drinkService.deleteDrink(id).subscribe({
          next: () => {
            this.loadDrinks();

            // ✅ Snackbar succès
            this.snackBar.open(
              `🥤 Le drink "${name}" a été supprimé avec succès.`,
              'Fermer',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success'],
              }
            );
          },
          error: (err) => console.error('Erreur delete:', err),
        });
      }
    });
  }

  // -------------------- Réinitialiser le formulaire --------------------
  private resetForm() {
    this.drinkForm.reset({ name: '', price: 0, image: '' });
    this.previewImage = '';
    this.selectedFile = undefined!;
    this.editingDrink = null;
  }
}
