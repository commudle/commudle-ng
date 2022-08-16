import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserWorkHistoryCardComponent } from './user-work-history-card.component';

describe('UserWorkHistoryCardComponent', () => {
  let component: UserWorkHistoryCardComponent;
  let fixture: ComponentFixture<UserWorkHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserWorkHistoryCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
