import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileCardMediumComponent } from './user-profile-card-medium.component';

describe('UserProfileCardMediumComponent', () => {
  let component: UserProfileCardMediumComponent;
  let fixture: ComponentFixture<UserProfileCardMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileCardMediumComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
