import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDiscussionComponent } from './channel-discussion.component';

describe('ChannelDiscussionComponent', () => {
  let component: ChannelDiscussionComponent;
  let fixture: ComponentFixture<ChannelDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelDiscussionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
