import { TestBed, inject } from '@angular/core/testing';

import { BaseDatosService } from './base-datos.service';

describe('BaseDatosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseDatosService]
    });
  });

  it('should be created', inject([BaseDatosService], (service: BaseDatosService) => {
    expect(service).toBeTruthy();
  }));
});
