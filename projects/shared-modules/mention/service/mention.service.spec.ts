import { TestBed } from '@angular/core/testing';

import { MentionService } from './mention.service';

describe('MentionService', () => {
  let service: MentionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
