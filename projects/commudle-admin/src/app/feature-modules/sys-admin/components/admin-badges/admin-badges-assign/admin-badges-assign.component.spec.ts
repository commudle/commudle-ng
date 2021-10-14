import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBadgesAssignComponent } from './admin-badges-assign.component';

describe('AdminBadgesAssignComponent', () => {
  let component: AdminBadgesAssignComponent;
  let fixture: ComponentFixture<AdminBadgesAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBadgesAssignComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBadgesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
