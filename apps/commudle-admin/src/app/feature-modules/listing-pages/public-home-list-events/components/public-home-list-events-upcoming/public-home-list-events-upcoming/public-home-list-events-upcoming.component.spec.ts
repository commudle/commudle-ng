import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsUpcomingComponent } from './public-home-list-events-upcoming.component';

describe('PublicHomeListEventsUpcomingComponent', () => {
  let component: PublicHomeListEventsUpcomingComponent;
  let fixture: ComponentFixture<PublicHomeListEventsUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsUpcomingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
