import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationPreferencesComponent } from './communication-preferences.component';

describe('CommunicationPreferencesComponent', () => {
  let component: CommunicationPreferencesComponent;
  let fixture: ComponentFixture<CommunicationPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationPreferencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
