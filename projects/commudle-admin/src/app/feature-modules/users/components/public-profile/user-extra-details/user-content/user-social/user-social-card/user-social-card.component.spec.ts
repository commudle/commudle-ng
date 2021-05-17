import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSocialCardComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-social/user-social-card/user-social-card.component';

describe('UserSocialCardComponent', () => {
  let component: UserSocialCardComponent;
  let fixture: ComponentFixture<UserSocialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSocialCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSocialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
