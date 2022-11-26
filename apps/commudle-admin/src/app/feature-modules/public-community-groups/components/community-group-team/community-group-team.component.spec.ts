import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityGroupTeamComponent } from './community-group-team.component';

describe('CommunityGroupTeamComponent', () => {
  let component: CommunityGroupTeamComponent;
  let fixture: ComponentFixture<CommunityGroupTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityGroupTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
