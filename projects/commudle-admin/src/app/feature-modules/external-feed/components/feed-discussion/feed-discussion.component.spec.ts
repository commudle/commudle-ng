import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedDiscussionComponent} from './feed-discussion.component';

describe('LabDiscussionComponent', () => {
  let component: FeedDiscussionComponent;
  let fixture: ComponentFixture<FeedDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedDiscussionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
