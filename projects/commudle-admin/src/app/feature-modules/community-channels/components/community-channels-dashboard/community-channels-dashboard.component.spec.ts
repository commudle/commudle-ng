import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChannelsDashboardComponent } from './community-channels-dashboard.component';

describe('CommunityChannelsDashboardComponent', () => {
  let component: CommunityChannelsDashboardComponent;
  let fixture: ComponentFixture<CommunityChannelsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityChannelsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
