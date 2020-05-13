import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDiscussionQuestionComponent } from './session-discussion-question.component';

describe('SessionDiscussionQuestionComponent', () => {
  let component: SessionDiscussionQuestionComponent;
  let fixture: ComponentFixture<SessionDiscussionQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDiscussionQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDiscussionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
