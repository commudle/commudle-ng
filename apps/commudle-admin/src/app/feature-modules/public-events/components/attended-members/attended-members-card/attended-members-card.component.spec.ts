import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendedMembersCardComponent } from './attended-members-card.component';

describe('AttendedMembersCardComponent', () => {
  let component: AttendedMembersCardComponent;
  let fixture: ComponentFixture<AttendedMembersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendedMembersCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendedMembersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
