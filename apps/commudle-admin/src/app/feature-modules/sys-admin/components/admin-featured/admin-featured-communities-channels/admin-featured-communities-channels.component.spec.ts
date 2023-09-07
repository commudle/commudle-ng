import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeaturedCommunitiesChannelsComponent } from './admin-featured-communities-channels.component';

describe('AdminFeaturedCommunitiesChannelsComponent', () => {
  let component: AdminFeaturedCommunitiesChannelsComponent;
  let fixture: ComponentFixture<AdminFeaturedCommunitiesChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeaturedCommunitiesChannelsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeaturedCommunitiesChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
