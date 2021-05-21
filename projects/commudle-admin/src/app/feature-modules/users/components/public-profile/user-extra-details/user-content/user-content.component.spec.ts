import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserContentComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-content.component';

describe('UserContentComponent', () => {
  let component: UserContentComponent;
  let fixture: ComponentFixture<UserContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
