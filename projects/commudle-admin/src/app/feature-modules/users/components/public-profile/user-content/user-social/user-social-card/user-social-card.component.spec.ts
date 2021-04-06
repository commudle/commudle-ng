import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSocialCardComponent} from './user-social-card.component';

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
