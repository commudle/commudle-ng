import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExternalFeedDetailsComponent } from './single-external-feed-details.component';

describe('SingleExtrnalFeedDetailsComponent', () => {
  let component: SingleExternalFeedDetailsComponent;
  let fixture: ComponentFixture<SingleExternalFeedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExternalFeedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExternalFeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
