import { TestBed } from '@angular/core/testing';

import { SouscatService } from './souscat.service';

describe('SouscatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SouscatService = TestBed.get(SouscatService);
    expect(service).toBeTruthy();
  });
});
