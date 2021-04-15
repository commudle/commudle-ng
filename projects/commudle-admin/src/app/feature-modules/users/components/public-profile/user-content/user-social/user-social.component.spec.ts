import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSocialComponent} from './user-social.component';

describe('UserSocialComponent', () => {
  let component: UserSocialComponent;
  let fixture: ComponentFixture<UserSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSocialComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
