import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDeactivateAccountConsentComponent } from './accept-deactivate-account-consent.component';

describe('AcceptDeactivateAccountConsentComponent', () => {
  let component: AcceptDeactivateAccountConsentComponent;
  let fixture: ComponentFixture<AcceptDeactivateAccountConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptDeactivateAccountConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptDeactivateAccountConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
