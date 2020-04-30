import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSessionDetailsComponent } from './speaker-session-details.component';

describe('SpeakerSessionDetailsComponent', () => {
  let component: SpeakerSessionDetailsComponent;
  let fixture: ComponentFixture<SpeakerSessionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerSessionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
