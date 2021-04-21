import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerResourceDiscussionMessageComponent } from './speaker-resource-discussion-message.component';

describe('SpeakerResourceDiscussionMessageComponent', () => {
  let component: SpeakerResourceDiscussionMessageComponent;
  let fixture: ComponentFixture<SpeakerResourceDiscussionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerResourceDiscussionMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerResourceDiscussionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
