import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBuildCardComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-contributions/user-build-card/user-build-card.component';

describe('UserBuildCardComponent', () => {
  let component: UserBuildCardComponent;
  let fixture: ComponentFixture<UserBuildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [UserBuildCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBuildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
