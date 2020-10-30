import { TestBed } from '@angular/core/testing';

import { SalesUnitService } from './sales-unit.service';

describe('SalesUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesUnitService = TestBed.get(SalesUnitService);
    expect(service).toBeTruthy();
  });
});
