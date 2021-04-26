import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedItemDiscussionMessageComponent} from './feed-item-discussion-message.component';

describe('FeedItemDiscussionMessageComponent', () => {
  let component: FeedItemDiscussionMessageComponent;
  let fixture: ComponentFixture<FeedItemDiscussionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedItemDiscussionMessageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemDiscussionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
