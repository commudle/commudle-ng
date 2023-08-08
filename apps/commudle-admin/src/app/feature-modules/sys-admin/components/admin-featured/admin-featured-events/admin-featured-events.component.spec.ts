import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedEventsComponent } from './admin-featured-events.component';

describe('AdminFeaturedEventsComponent', () => {
  let component: AdminFeaturedEventsComponent;
  let fixture: ComponentFixture<AdminFeaturedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeaturedEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeaturedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
