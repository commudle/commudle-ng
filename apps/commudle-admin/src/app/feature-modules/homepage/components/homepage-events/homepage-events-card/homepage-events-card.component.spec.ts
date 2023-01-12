import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEventsCardComponent } from './homepage-events-card.component';

describe('HomepageEventsCardComponent', () => {
  let component: HomepageEventsCardComponent;
  let fixture: ComponentFixture<HomepageEventsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageEventsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageEventsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
