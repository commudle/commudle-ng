import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedItemDetailsComponent } from './feed-item-details.component';

describe('SingleExtrnalFeedDetailsComponent', () => {
  let component: FeedItemDetailsComponent;
  let fixture: ComponentFixture<FeedItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
