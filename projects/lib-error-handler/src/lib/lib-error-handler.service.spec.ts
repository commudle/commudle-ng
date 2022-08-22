import { TestBed } from '@angular/core/testing';

import { LibErrorHandlerService } from './lib-error-handler.service';

describe('LibErrorHandlerService', () => {
  let service: LibErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
