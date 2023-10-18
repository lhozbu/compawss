import { TestBed } from '@angular/core/testing';

import { PetFinderEndpointService } from './pet-finder-endpoint.service';

describe('PetFinderEndpointService', () => {
  let service: PetFinderEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetFinderEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
