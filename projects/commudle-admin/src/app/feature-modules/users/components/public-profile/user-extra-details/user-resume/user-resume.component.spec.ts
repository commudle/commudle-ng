import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserResumeComponent } from './user-resume.component';

describe('UserResumeComponent', () => {
  let component: UserResumeComponent;
  let fixture: ComponentFixture<UserResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserResumeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
