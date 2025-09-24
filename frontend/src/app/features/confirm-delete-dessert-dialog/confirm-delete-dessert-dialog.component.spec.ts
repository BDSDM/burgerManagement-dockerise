import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDessertDialogComponent } from './confirm-delete-dessert-dialog.component';

describe('ConfirmDeleteDessertDialogComponent', () => {
  let component: ConfirmDeleteDessertDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDessertDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteDessertDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteDessertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
