import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptBuildTeammateConsentComponent } from './accept-build-teammate-consent.component';

describe('AcceptBuildTeammateConsentComponent', () => {
  let component: AcceptBuildTeammateConsentComponent;
  let fixture: ComponentFixture<AcceptBuildTeammateConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptBuildTeammateConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptBuildTeammateConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
