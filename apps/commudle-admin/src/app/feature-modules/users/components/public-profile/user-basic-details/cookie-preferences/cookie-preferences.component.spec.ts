import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePreferencesComponent } from './cookie-preferences.component';

describe('CookiePreferencesComponent', () => {
  let component: CookiePreferencesComponent;
  let fixture: ComponentFixture<CookiePreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiePreferencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
