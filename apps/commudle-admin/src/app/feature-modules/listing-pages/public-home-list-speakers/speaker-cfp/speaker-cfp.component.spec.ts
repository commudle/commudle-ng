import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerCfpComponent } from './speaker-cfp.component';

describe('SpeakerCfpComponent', () => {
  let component: SpeakerCfpComponent;
  let fixture: ComponentFixture<SpeakerCfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerCfpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerCfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
