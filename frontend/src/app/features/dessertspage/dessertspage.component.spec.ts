import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertspageComponent } from './dessertspage.component';

describe('DessertspageComponent', () => {
  let component: DessertspageComponent;
  let fixture: ComponentFixture<DessertspageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DessertspageComponent]
    });
    fixture = TestBed.createComponent(DessertspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
