import { TestBed } from '@angular/core/testing';

import { DessertService } from './dessert.service';

describe('DessertService', () => {
  let service: DessertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DessertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
