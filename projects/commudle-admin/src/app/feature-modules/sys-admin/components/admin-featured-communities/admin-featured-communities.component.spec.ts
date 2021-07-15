import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedCommunitiesComponent } from './admin-featured-communities.component';

describe('AdminFeaturedCommunitiesComponent', () => {
  let component: AdminFeaturedCommunitiesComponent;
  let fixture: ComponentFixture<AdminFeaturedCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeaturedCommunitiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeaturedCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
