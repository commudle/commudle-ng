import { TestBed } from '@angular/core/testing';

import { NgxNebularWrapperService } from './ngx-nebular-wrapper.service';

describe('NgxNebularWrapperService', () => {
  let service: NgxNebularWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNebularWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
