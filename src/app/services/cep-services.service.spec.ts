import { TestBed } from '@angular/core/testing';

import { CepServicesService } from './cep-services.service';

describe('CepServicesService', () => {
  let service: CepServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
