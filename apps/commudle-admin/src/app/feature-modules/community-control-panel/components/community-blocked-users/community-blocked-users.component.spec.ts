import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBlockedUsersComponent } from './community-blocked-users.component';

describe('CommunityBlockedUsersComponent', () => {
  let component: CommunityBlockedUsersComponent;
  let fixture: ComponentFixture<CommunityBlockedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityBlockedUsersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
