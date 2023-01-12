import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityStatsComponent } from './community-stats.component';

describe('CommunityStatsComponent', () => {
  let component: CommunityStatsComponent;
  let fixture: ComponentFixture<CommunityStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
