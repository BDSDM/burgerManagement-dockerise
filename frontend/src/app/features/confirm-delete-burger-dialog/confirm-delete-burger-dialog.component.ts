import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-burger-dialog',
  templateUrl: './confirm-delete-burger-dialog.component.html',
  styleUrls: ['./confirm-delete-burger-dialog.component.css'],
})
export class ConfirmDeleteBurgerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteBurgerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // ❌ Annuler
  }

  onConfirm(): void {
    this.dialogRef.close(true); // ✅ Confirmer
  }
}
