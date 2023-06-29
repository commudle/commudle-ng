import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListSpeakersUpcomingComponent } from './public-home-list-speakers-upcoming.component';

describe('PublicHomeListSpeakersUpcomingComponent', () => {
  let component: PublicHomeListSpeakersUpcomingComponent;
  let fixture: ComponentFixture<PublicHomeListSpeakersUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListSpeakersUpcomingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListSpeakersUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
