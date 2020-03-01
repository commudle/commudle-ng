import { TestBed } from '@angular/core/testing';

import { LibAuthwatchService } from './lib-authwatch.service';

describe('LibAuthwatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibAuthwatchService = TestBed.get(LibAuthwatchService);
    expect(service).toBeTruthy();
  });
});
