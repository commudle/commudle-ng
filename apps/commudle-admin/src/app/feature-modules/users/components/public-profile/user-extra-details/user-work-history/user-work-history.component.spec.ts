import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserWorkHistoryComponent } from './user-work-history.component';

describe('UserWorkHistoryComponent', () => {
  let component: UserWorkHistoryComponent;
  let fixture: ComponentFixture<UserWorkHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserWorkHistoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
