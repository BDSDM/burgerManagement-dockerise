import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dessert-dialog',
  templateUrl: './confirm-delete-dessert-dialog.component.html',
  styleUrls: ['./confirm-delete-dessert-dialog.component.css'],
})
export class ConfirmDeleteDessertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDessertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
