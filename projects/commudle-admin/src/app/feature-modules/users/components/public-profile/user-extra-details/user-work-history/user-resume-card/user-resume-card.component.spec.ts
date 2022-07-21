import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserResumeCardComponent } from './user-resume-card.component';

describe('UserResumeCardComponent', () => {
  let component: UserResumeCardComponent;
  let fixture: ComponentFixture<UserResumeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserResumeCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
