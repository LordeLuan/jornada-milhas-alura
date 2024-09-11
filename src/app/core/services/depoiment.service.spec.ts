import { TestBed } from '@angular/core/testing';

import { DepoimentService } from './depoiment.service';

describe('DepoimentService', () => {
  let service: DepoimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepoimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
