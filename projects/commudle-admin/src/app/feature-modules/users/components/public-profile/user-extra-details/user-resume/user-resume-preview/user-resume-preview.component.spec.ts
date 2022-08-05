import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserResumePreviewComponent } from './user-resume-preview.component';

describe('UserResumePreviewComponent', () => {
  let component: UserResumePreviewComponent;
  let fixture: ComponentFixture<UserResumePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserResumePreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResumePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
