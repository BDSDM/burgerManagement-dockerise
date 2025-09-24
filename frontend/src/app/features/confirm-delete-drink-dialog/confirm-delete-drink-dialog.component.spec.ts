import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDrinkDialogComponent } from './confirm-delete-drink-dialog.component';

describe('ConfirmDeleteDrinkDialogComponent', () => {
  let component: ConfirmDeleteDrinkDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDrinkDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteDrinkDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteDrinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
