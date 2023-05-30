import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowConsentComponent } from './user-follow-consent.component';

describe('UserFollowConsentComponent', () => {
  let component: UserFollowConsentComponent;
  let fixture: ComponentFixture<UserFollowConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFollowConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFollowConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
