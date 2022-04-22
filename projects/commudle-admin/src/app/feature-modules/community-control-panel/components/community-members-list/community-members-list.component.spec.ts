import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMembersListComponent } from './community-members-list.component';

describe('CommunityMembersListComponent', () => {
  let component: CommunityMembersListComponent;
  let fixture: ComponentFixture<CommunityMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityMembersListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
