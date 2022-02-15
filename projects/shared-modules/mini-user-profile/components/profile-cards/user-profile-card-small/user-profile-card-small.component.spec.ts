import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCardSmallComponent } from 'projects/shared-modules/mini-user-profile/components/profile-cards/user-profile-card-small/user-profile-card-small.component';

describe('UserProfileCardSmallComponent', () => {
  let component: UserProfileCardSmallComponent;
  let fixture: ComponentFixture<UserProfileCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileCardSmallComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
