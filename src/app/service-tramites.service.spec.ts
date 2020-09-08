import { TestBed } from '@angular/core/testing';

import { ServiceTramitesService } from './service-tramites.service';

describe('ServiceTramitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceTramitesService = TestBed.get(ServiceTramitesService);
    expect(service).toBeTruthy();
  });
});
