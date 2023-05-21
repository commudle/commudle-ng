import { TestBed } from '@angular/core/testing';

import { PublicHomeListEventsService } from './public-home-list-events.service';

describe('PublicHomeListEventsService', () => {
  let service: PublicHomeListEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicHomeListEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
