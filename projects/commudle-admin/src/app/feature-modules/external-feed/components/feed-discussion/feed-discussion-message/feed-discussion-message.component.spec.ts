import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedDiscussionMessageComponent} from './feed-discussion-message.component';

describe('FeedDiscussionMessageComponent', () => {
  let component: FeedDiscussionMessageComponent;
  let fixture: ComponentFixture<FeedDiscussionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedDiscussionMessageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDiscussionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
