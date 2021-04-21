import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerResourceDiscussionComponent } from './speaker-resource-discussion.component';

describe('SpeakerResourceDiscussionComponent', () => {
  let component: SpeakerResourceDiscussionComponent;
  let fixture: ComponentFixture<SpeakerResourceDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerResourceDiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerResourceDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
