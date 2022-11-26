import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPreferencesComponent } from './email-preferences.component';

describe('EmailPreferencesComponent', () => {
  let component: EmailPreferencesComponent;
  let fixture: ComponentFixture<EmailPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailPreferencesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
