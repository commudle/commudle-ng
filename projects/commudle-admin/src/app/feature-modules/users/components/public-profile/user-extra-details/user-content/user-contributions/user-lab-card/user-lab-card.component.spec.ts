import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserLabCardComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-content/user-contributions/user-lab-card/user-lab-card.component';

describe('UserLabCardComponent', () => {
  let component: UserLabCardComponent;
  let fixture: ComponentFixture<UserLabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [UserLabCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
