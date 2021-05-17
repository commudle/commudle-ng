import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserContributionsComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-contributions/user-contributions.component';

describe('UserContributionsComponent', () => {
  let component: UserContributionsComponent;
  let fixture: ComponentFixture<UserContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserContributionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
