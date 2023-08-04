import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedComponent } from './admin-featured.component';

describe('AdminFeaturedComponent', () => {
  let component: AdminFeaturedComponent;
  let fixture: ComponentFixture<AdminFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeaturedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
