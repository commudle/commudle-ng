import { TestBed } from '@angular/core/testing';

import { ApiRoutesService } from './api-routes.service';

describe('ApiRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiRoutesService = TestBed.get(ApiRoutesService);
    expect(service).toBeTruthy();
  });
});
