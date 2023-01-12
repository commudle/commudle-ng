import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityEventsListComponent } from './community-events-list.component';

describe('CommunityEventsListComponent', () => {
  let component: CommunityEventsListComponent;
  let fixture: ComponentFixture<CommunityEventsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
