import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerCommunitiesListComponent } from './organizer-communities-list.component';

describe('OrganizerCommunitiesListComponent', () => {
  let component: OrganizerCommunitiesListComponent;
  let fixture: ComponentFixture<OrganizerCommunitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerCommunitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerCommunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
