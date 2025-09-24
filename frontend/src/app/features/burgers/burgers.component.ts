import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Burger, BurgerService } from 'src/app/core/services/burger.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ConfirmDeleteBurgerDialogComponent } from '../confirm-delete-burger-dialog/confirm-delete-burger-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.css'],
})
export class BurgersComponent implements OnInit {
  burgers: Burger[] = [];
  dataSource = new MatTableDataSource<Burger>([]);
  displayedColumns: string[] = ['name', 'price', 'image', 'actions'];

  burgerForm: FormGroup;
  editingBurger: Burger | null = null;
  dialogRef!: MatDialogRef<any>;

  selectedFile!: File; // fichier sélectionné
  previewImage!: string; // URL prévisualisation

  @ViewChild('burgerDialog') burgerDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private burgerService: BurgerService,
    private snackBar: MatSnackBar,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.burgerForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''], // stockera l'URL finale après upload
    });
  }

  ngOnInit(): void {
    this.loadBurgers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // -------------------- Charger tous les burgers --------------------
  loadBurgers() {
    this.burgerService.getAllBurgers().subscribe({
      next: (data) => {
        this.burgers = data;
        this.dataSource.data = this.burgers;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => console.error('Erreur API:', err),
    });
  }

  // -------------------- Ouvrir le dialog --------------------
  openDialog(burger?: Burger) {
    this.editingBurger = burger || null;

    if (burger) {
      this.burgerForm.patchValue({
        name: burger.name,
        price: burger.price,
        image: burger.image,
      });
      this.previewImage = burger.image;
    } else {
      this.resetForm();
    }

    this.dialogRef = this.dialog.open(this.burgerDialog);
  }

  // -------------------- Fichier sélectionné --------------------
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      // Prévisualisation locale avant upload
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
      // 1️⃣ Upload de l'image
      this.fileUploadService.uploadImage(this.selectedFile).subscribe({
        next: (url: string) => {
          // 2️⃣ Mettre l'URL dans le formulaire
          this.burgerForm.patchValue({ image: url });
          this.saveBurger();
        },
        error: (err) => console.error('Erreur upload:', err),
      });
    } else {
      this.saveBurger();
    }
  }

  // -------------------- Enregistrer le burger --------------------
  private saveBurger() {
    const burgerData = this.burgerForm.value; // contient uniquement name, price, image

    if (this.editingBurger) {
      this.burgerService
        .updateBurger(this.editingBurger.id, burgerData)
        .subscribe({
          next: () => {
            this.loadBurgers();
            this.dialogRef.close();
            this.resetForm();
          },
          error: (err) => console.error('Erreur update:', err),
        });
    } else {
      this.burgerService.createBurger(burgerData).subscribe({
        next: () => {
          this.loadBurgers();
          this.dialogRef.close();
          this.resetForm();
        },
        error: (err) => console.error('Erreur create:', err),
      });
    }
  }

  // -------------------- Supprimer un burger --------------------
  deleteBurger(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteBurgerDialogComponent, {
      width: '400px',
      data: { name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.burgerService.deleteBurger(id).subscribe({
          next: () => {
            this.loadBurgers();

            // ✅ Snackbar succès
            this.snackBar.open(
              `🍔 Le burger "${name}" a été supprimé avec succès.`,
              'Fermer',
              {
                duration: 3000, // disparaît après 3s
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success'], // classe CSS personnalisée
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
    this.burgerForm.reset({ name: '', price: 0, image: '' });
    this.previewImage = '';
    this.selectedFile = undefined!;
    this.editingBurger = null;
  }
}
