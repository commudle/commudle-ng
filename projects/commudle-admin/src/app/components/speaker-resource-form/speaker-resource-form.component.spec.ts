import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerResourceFormComponent } from './speaker-resource-form.component';

describe('SpeakerResourceFormComponent', () => {
  let component: SpeakerResourceFormComponent;
  let fixture: ComponentFixture<SpeakerResourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerResourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
