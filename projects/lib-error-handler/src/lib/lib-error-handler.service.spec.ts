import { TestBed } from '@angular/core/testing';

import { LibErrorHandlerService } from './lib-error-handler.service';

describe('LibErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibErrorHandlerService = TestBed.get(LibErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
