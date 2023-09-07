import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedUsersComponent } from './admin-featured-users.component';

describe('AdminFeaturedUsersComponent', () => {
  let component: AdminFeaturedUsersComponent;
  let fixture: ComponentFixture<AdminFeaturedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeaturedUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeaturedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
