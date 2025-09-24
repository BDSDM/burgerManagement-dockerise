import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteBurgerDialogComponent } from './confirm-delete-burger-dialog.component';

describe('ConfirmDeleteBurgerDialogComponent', () => {
  let component: ConfirmDeleteBurgerDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteBurgerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteBurgerDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteBurgerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
