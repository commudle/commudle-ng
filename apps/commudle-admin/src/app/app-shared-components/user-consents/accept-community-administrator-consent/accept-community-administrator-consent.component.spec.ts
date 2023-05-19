import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCommunityAdministratorConsentComponent } from './accept-community-administrator-consent.component';

describe('AcceptCommunityAdministratorConsentComponent', () => {
  let component: AcceptCommunityAdministratorConsentComponent;
  let fixture: ComponentFixture<AcceptCommunityAdministratorConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptCommunityAdministratorConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptCommunityAdministratorConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
