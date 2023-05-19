import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptResumeConsentComponent } from './accept-resume-consent.component';

describe('AcceptResumeConsentComponent', () => {
  let component: AcceptResumeConsentComponent;
  let fixture: ComponentFixture<AcceptResumeConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptResumeConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptResumeConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
