import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserJobCardComponent } from './user-job-card.component';

describe('UserJobCardComponent', () => {
  let component: UserJobCardComponent;
  let fixture: ComponentFixture<UserJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserJobCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
