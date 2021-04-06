import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserFeedInputComponent} from './user-feed-input.component';

describe('UserFeedInputComponent', () => {
  let component: UserFeedInputComponent;
  let fixture: ComponentFixture<UserFeedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFeedInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
