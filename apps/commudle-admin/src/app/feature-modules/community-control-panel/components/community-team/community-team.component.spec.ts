import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityTeamComponent } from './community-team.component';

describe('CommunityTeamComponent', () => {
  let component: CommunityTeamComponent;
  let fixture: ComponentFixture<CommunityTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
