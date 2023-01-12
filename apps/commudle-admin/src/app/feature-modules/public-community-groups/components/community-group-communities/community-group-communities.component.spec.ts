import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityGroupCommunitiesComponent } from './community-group-communities.component';

describe('CommunityGroupCommunitiesComponent', () => {
  let component: CommunityGroupCommunitiesComponent;
  let fixture: ComponentFixture<CommunityGroupCommunitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityGroupCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
