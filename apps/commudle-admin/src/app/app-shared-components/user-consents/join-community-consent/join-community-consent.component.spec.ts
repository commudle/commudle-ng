import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCommunityConsentComponent } from './join-community-consent.component';

describe('JoinCommunityConsentComponent', () => {
  let component: JoinCommunityConsentComponent;
  let fixture: ComponentFixture<JoinCommunityConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinCommunityConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinCommunityConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
