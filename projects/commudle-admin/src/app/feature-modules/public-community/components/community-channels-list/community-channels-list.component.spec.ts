import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityChannelsListComponent } from './community-channels-list.component';

describe('CommunityChannelsListComponent', () => {
  let component: CommunityChannelsListComponent;
  let fixture: ComponentFixture<CommunityChannelsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityChannelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
