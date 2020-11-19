import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityChannelListComponent } from './community-channel-list.component';

describe('CommunityChannelListComponent', () => {
  let component: CommunityChannelListComponent;
  let fixture: ComponentFixture<CommunityChannelListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityChannelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
