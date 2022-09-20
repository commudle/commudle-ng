import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityNotificationsComponent } from './community-notifications.component';

describe('CommunityNotificationComponent', () => {
  let component: CommunityNotificationsComponent;
  let fixture: ComponentFixture<CommunityNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityNotificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
