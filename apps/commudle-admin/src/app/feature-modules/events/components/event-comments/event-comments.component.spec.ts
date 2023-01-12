import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventCommentsComponent } from './event-comments.component';

describe('EventCommentsComponent', () => {
  let component: EventCommentsComponent;
  let fixture: ComponentFixture<EventCommentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
