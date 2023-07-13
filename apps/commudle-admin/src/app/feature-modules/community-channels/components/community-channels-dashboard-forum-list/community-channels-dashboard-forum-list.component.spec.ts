import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChannelsDashboardForumListComponent } from './community-channels-dashboard-forum-list.component';

describe('CommunityChannelsDashboardForumListComponent', () => {
  let component: CommunityChannelsDashboardForumListComponent;
  let fixture: ComponentFixture<CommunityChannelsDashboardForumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityChannelsDashboardForumListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityChannelsDashboardForumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
