import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAdminNotificationsComponent } from './community-admin-notifications.component';

describe('CommunityNotificationComponent', () => {
  let component: CommunityAdminNotificationsComponent;
  let fixture: ComponentFixture<CommunityAdminNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityAdminNotificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityAdminNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
