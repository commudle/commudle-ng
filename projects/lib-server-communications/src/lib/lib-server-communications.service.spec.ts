import { TestBed } from '@angular/core/testing';

import { LibServerCommunicationsService } from './lib-server-communications.service';

describe('LibServerCommunicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibServerCommunicationsService = TestBed.get(LibServerCommunicationsService);
    expect(service).toBeTruthy();
  });
});
