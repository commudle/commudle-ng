import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCommunityCardComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-contributions/user-community-card/user-community-card.component';

describe('UserCommunityCardComponent', () => {
  let component: UserCommunityCardComponent;
  let fixture: ComponentFixture<UserCommunityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [UserCommunityCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommunityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
