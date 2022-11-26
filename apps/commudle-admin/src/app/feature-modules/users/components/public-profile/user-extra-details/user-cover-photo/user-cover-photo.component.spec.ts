import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCoverPhotoComponent} from 'apps/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-cover-photo/user-cover-photo.component';

describe('UserCoverPhotoComponent', () => {
  let component: UserCoverPhotoComponent;
  let fixture: ComponentFixture<UserCoverPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCoverPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoverPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
