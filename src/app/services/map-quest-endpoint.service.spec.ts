import { TestBed } from '@angular/core/testing';

import { MapQuestEndpointService } from './map-quest-endpoint.service';

describe('MapQuestEndpointService', () => {
  let service: MapQuestEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapQuestEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
