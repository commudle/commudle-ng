import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceSettingsComponent } from './conference-settings.component';

describe('ConferenceSettingsComponent', () => {
  let component: ConferenceSettingsComponent;
  let fixture: ComponentFixture<ConferenceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
