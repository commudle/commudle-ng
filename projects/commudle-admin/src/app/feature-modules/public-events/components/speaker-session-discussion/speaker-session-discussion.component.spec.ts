import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSessionDiscussionComponent } from './speaker-session-discussion.component';

describe('SpeakerSessionDiscussionComponent', () => {
  let component: SpeakerSessionDiscussionComponent;
  let fixture: ComponentFixture<SpeakerSessionDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerSessionDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerSessionDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
