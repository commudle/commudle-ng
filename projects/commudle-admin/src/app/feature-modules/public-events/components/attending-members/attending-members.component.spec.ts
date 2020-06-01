import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendingMembersComponent } from './attending-members.component';

describe('AttendingMembersComponent', () => {
  let component: AttendingMembersComponent;
  let fixture: ComponentFixture<AttendingMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendingMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
