import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPastEventCardComponent} from './user-past-event-card.component';

describe('UserPastEventCardComponent', () => {
  let component: UserPastEventCardComponent;
  let fixture: ComponentFixture<UserPastEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPastEventCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPastEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
