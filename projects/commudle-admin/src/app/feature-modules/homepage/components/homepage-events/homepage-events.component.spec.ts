import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEventsComponent } from './homepage-events.component';

describe('HomepageEventsComponent', () => {
  let component: HomepageEventsComponent;
  let fixture: ComponentFixture<HomepageEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
