import { TestBed } from '@angular/core/testing';

import { LibApiParserService } from './lib-api-parser.service';

describe('LibApiParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibApiParserService = TestBed.get(LibApiParserService);
    expect(service).toBeTruthy();
  });
});
