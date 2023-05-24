import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDeleteAccountConsentComponent } from './accept-delete-account-consent.component';

describe('AcceptDeleteAccountConsentComponent', () => {
  let component: AcceptDeleteAccountConsentComponent;
  let fixture: ComponentFixture<AcceptDeleteAccountConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptDeleteAccountConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptDeleteAccountConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
