import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChannelsDashboardChannelListComponent } from './community-channels-dashboard-channel-list.component';

describe('CommunityChannelsDashboardChannelListComponent', () => {
  let component: CommunityChannelsDashboardChannelListComponent;
  let fixture: ComponentFixture<CommunityChannelsDashboardChannelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityChannelsDashboardChannelListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelsDashboardChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
