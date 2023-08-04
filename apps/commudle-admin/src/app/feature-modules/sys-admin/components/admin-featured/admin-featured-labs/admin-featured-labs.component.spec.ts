import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedLabsComponent } from './admin-featured-labs.component';

describe('AdminFeaturedLabsComponent', () => {
  let component: AdminFeaturedLabsComponent;
  let fixture: ComponentFixture<AdminFeaturedLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeaturedLabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeaturedLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
