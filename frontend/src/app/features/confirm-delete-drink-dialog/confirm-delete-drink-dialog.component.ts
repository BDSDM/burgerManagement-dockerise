import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-drink-dialog',
  templateUrl: './confirm-delete-drink-dialog.component.html',
  styleUrls: ['./confirm-delete-drink-dialog.component.css'],
})
export class ConfirmDeleteDrinkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDrinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
