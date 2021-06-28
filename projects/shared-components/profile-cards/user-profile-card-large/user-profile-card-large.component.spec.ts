import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCardLargeComponent } from 'projects/shared-components/profile-cards/user-profile-card-large/user-profile-card-large.component';

describe('UserProfileCardLargeComponent', () => {
  let component: UserProfileCardLargeComponent;
  let fixture: ComponentFixture<UserProfileCardLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileCardLargeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCardLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
