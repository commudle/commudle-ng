import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFollowComponent} from './user-follow.component';

describe('UserFollowComponent', () => {
  let component: UserFollowComponent;
  let fixture: ComponentFixture<UserFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFollowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
