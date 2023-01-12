import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBadgesComponent} from './user-badges.component';

describe('UserBadgesComponent', () => {
  let component: UserBadgesComponent;
  let fixture: ComponentFixture<UserBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBadgesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
