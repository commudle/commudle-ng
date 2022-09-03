import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCommunityNotificationsComponent } from './publiccommunity-notifications.component';

describe('NotificationComponent', () => {
  let component: PublicCommunityNotificationsComponent;
  let fixture: ComponentFixture<PublicCommunityNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicCommunityNotificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCommunityNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
