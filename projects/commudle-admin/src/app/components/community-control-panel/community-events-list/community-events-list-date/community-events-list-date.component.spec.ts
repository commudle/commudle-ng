import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityEventsListDateComponent } from './community-events-list-date.component';

describe('CommunityEventsListDateComponent', () => {
  let component: CommunityEventsListDateComponent;
  let fixture: ComponentFixture<CommunityEventsListDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityEventsListDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityEventsListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
