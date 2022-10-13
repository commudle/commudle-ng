import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityEmailsListComponent } from './community-emails-list.component';

describe('CommunityEmailsListComponent', () => {
  let component: CommunityEmailsListComponent;
  let fixture: ComponentFixture<CommunityEmailsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityEmailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityEmailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
