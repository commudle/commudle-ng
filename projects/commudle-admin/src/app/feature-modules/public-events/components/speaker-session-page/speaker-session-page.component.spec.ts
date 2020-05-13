import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSessionPageComponent } from './speaker-session-page.component';

describe('SpeakerSessionPageComponent', () => {
  let component: SpeakerSessionPageComponent;
  let fixture: ComponentFixture<SpeakerSessionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerSessionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
