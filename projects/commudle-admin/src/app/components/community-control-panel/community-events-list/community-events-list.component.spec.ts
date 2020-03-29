import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityEventsListComponent } from './community-events-list.component';

describe('CommunityEventsListComponent', () => {
  let component: CommunityEventsListComponent;
  let fixture: ComponentFixture<CommunityEventsListComponent>;

  beforeEach(async(() => {
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
