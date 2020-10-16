import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityEventsListActionsComponent } from './community-events-list-actions.component';

describe('CommunityEventsListActionsComponent', () => {
  let component: CommunityEventsListActionsComponent;
  let fixture: ComponentFixture<CommunityEventsListActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityEventsListActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityEventsListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
