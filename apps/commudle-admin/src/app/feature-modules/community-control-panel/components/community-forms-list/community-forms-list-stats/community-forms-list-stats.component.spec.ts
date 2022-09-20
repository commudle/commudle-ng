import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityFormsListStatsComponent } from './community-forms-list-stats.component';

describe('CommunityFormsListStatsComponent', () => {
  let component: CommunityFormsListStatsComponent;
  let fixture: ComponentFixture<CommunityFormsListStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityFormsListStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFormsListStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
