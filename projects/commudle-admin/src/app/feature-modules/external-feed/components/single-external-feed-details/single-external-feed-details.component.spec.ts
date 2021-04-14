import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExtrnalFeedDetailsComponent } from './single-external-feed-details.component';

describe('SingleExtrnalFeedDetailsComponent', () => {
  let component: SingleExtrnalFeedDetailsComponent;
  let fixture: ComponentFixture<SingleExtrnalFeedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExtrnalFeedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExtrnalFeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
