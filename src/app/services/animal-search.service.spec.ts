import { TestBed } from '@angular/core/testing';

import { AnimalSearchService } from './animal-search.service';

describe('ApiFederationService', () => {
  let service: AnimalSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
