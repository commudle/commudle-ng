import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityNotificationComponent } from './community-notification.component';

describe('CommunityNotificationComponent', () => {
  let component: CommunityNotificationComponent;
  let fixture: ComponentFixture<CommunityNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityNotificationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
