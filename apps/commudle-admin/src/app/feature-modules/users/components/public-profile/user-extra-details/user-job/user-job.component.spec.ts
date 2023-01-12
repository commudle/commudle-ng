import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserJobComponent } from './user-job.component';

describe('UserJobComponent', () => {
  let component: UserJobComponent;
  let fixture: ComponentFixture<UserJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserJobComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
