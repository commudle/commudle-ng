import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBadgesFormComponent } from './admin-badges-form.component';

describe('AdminBadgesFormComponent', () => {
  let component: AdminBadgesFormComponent;
  let fixture: ComponentFixture<AdminBadgesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBadgesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBadgesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
