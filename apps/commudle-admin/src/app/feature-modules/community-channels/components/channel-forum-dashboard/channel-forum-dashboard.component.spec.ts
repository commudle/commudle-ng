import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChannelForumDashboardComponent } from './channel-forum-dashboard.component';

describe('ChannelForumDashboardComponent', () => {
  let component: ChannelForumDashboardComponent;
  let fixture: ComponentFixture<ChannelForumDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelForumDashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelForumDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
