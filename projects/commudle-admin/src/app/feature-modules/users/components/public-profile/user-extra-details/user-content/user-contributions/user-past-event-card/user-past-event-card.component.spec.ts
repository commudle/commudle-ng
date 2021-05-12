import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPastEventCardComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-contributions/user-past-event-card/user-past-event-card.component';

describe('UserPastEventCardComponent', () => {
  let component: UserPastEventCardComponent;
  let fixture: ComponentFixture<UserPastEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPastEventCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPastEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
