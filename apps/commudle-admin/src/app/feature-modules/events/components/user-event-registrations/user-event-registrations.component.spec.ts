import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserEventRegistrationsComponent } from './user-event-registrations.component';

describe('UserEventRegistrationsComponent', () => {
  let component: UserEventRegistrationsComponent;
  let fixture: ComponentFixture<UserEventRegistrationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEventRegistrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEventRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
