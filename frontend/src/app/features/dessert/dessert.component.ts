import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Dessert } from 'src/app/core/models/dessert.model';
import { DessertService } from 'src/app/core/services/dessert.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ConfirmDeleteDessertDialogComponent } from '../confirm-delete-dessert-dialog/confirm-delete-dessert-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css'],
})
export class DessertComponent implements OnInit {
  desserts: Dessert[] = [];
  dataSource = new MatTableDataSource<Dessert>([]);
  displayedColumns: string[] = ['name', 'price', 'image', 'actions'];

  dessertForm: FormGroup;
  editingDessert: Dessert | null = null;
  dialogRef!: MatDialogRef<any>;

  selectedFile!: File;
  previewImage!: string;

  @ViewChild('dessertDialog') dessertDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dessertService: DessertService,
    private snackBar: MatSnackBar,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.dessertForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.loadDesserts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // -------------------- Charger tous les desserts --------------------
  loadDesserts() {
    this.dessertService.getAllDesserts().subscribe({
      next: (data) => {
        this.desserts = data;
        this.dataSource.data = this.desserts;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => console.error('Erreur API:', err),
    });
  }

  // -------------------- Ouvrir le dialog --------------------
  openDialog(dessert?: Dessert) {
    this.editingDessert = dessert || null;

    if (dessert) {
      this.dessertForm.patchValue({
        name: dessert.name,
        price: dessert.price,
        image: dessert.image,
      });
      this.previewImage = dessert.image;
    } else {
      this.resetForm();
    }

    this.dialogRef = this.dialog.open(this.dessertDialog);
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
          this.dessertForm.patchValue({ image: url });
          this.saveDessert();
        },
        error: (err) => console.error('Erreur upload:', err),
      });
    } else {
      this.saveDessert();
    }
  }

  // -------------------- Enregistrer le dessert --------------------
  private saveDessert() {
    const dessertData = this.dessertForm.value;

    if (this.editingDessert) {
      this.dessertService
        .updateDessert(this.editingDessert.id!, dessertData)
        .subscribe({
          next: () => {
            this.loadDesserts();
            this.dialogRef.close();
            this.resetForm();
          },
          error: (err) => console.error('Erreur update:', err),
        });
    } else {
      this.dessertService.createDessert(dessertData).subscribe({
        next: () => {
          this.loadDesserts();
          this.dialogRef.close();
          this.resetForm();
        },
        error: (err) => console.error('Erreur create:', err),
      });
    }
  }

  // -------------------- Supprimer un dessert --------------------
  deleteDessert(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDessertDialogComponent, {
      width: '400px',
      data: { id, name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dessertService.deleteDessert(id).subscribe({
          next: () => {
            this.loadDesserts();
            this.snackBar.open(
              `Le dessert "${name}" a été supprimé avec succès.`,
              'Fermer',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
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
    this.dessertForm.reset({ name: '', price: 0, image: '' });
    this.previewImage = '';
    this.selectedFile = undefined!;
    this.editingDessert = null;
  }
}
