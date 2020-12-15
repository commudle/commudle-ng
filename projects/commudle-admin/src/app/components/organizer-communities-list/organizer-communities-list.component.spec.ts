import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizerCommunitiesListComponent } from './organizer-communities-list.component';

describe('OrganizerCommunitiesListComponent', () => {
  let component: OrganizerCommunitiesListComponent;
  let fixture: ComponentFixture<OrganizerCommunitiesListComponent>;

  beforeEach(waitForAsync(() => {
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
