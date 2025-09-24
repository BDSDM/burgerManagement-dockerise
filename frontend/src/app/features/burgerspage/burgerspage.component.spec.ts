import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerspageComponent } from './burgerspage.component';

describe('BurgerspageComponent', () => {
  let component: BurgerspageComponent;
  let fixture: ComponentFixture<BurgerspageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BurgerspageComponent]
    });
    fixture = TestBed.createComponent(BurgerspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
