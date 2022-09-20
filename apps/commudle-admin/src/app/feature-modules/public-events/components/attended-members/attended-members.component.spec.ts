import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendedMembersComponent } from './attended-members.component';

describe('AttendedMembersComponent', () => {
  let component: AttendedMembersComponent;
  let fixture: ComponentFixture<AttendedMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendedMembersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendedMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
