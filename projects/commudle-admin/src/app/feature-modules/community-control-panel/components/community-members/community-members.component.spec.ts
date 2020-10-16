import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMembersComponent } from './community-members.component';

describe('CommunityMembersComponent', () => {
  let component: CommunityMembersComponent;
  let fixture: ComponentFixture<CommunityMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
