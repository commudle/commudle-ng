import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGroupTeamComponent } from './community-group-team.component';

describe('CommunityGroupTeamComponent', () => {
  let component: CommunityGroupTeamComponent;
  let fixture: ComponentFixture<CommunityGroupTeamComponent>;

  beforeEach(async(() => {
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
