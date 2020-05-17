import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSessionQuestionRepliesComponent } from './speaker-session-question-replies.component';

describe('SpeakerSessionQuestionRepliesComponent', () => {
  let component: SpeakerSessionQuestionRepliesComponent;
  let fixture: ComponentFixture<SpeakerSessionQuestionRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerSessionQuestionRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerSessionQuestionRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
