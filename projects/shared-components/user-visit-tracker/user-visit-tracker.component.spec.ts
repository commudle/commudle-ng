import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVisitTrackerComponent } from './user-visit-tracker.component';

describe('UserVisitTrackerComponent', () => {
  let component: UserVisitTrackerComponent;
  let fixture: ComponentFixture<UserVisitTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVisitTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVisitTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
