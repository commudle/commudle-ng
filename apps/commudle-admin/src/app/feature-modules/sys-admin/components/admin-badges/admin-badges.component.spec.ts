import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBadgesComponent } from './admin-badges.component';

describe('AdminBadgesComponent', () => {
  let component: AdminBadgesComponent;
  let fixture: ComponentFixture<AdminBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBadgesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
