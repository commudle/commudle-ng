import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChannelsListComponent } from './community-channels-list.component';

describe('CommunityChannelsListComponent', () => {
  let component: CommunityChannelsListComponent;
  let fixture: ComponentFixture<CommunityChannelsListComponent>;

  beforeEach(async(() => {
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
