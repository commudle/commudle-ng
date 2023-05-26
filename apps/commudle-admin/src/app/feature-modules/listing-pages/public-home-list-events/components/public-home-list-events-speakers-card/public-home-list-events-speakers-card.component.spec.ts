import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsSpeakersCardComponent } from './public-home-list-events-speakers-card.component';

describe('PublicHomeListEventsSpeakersCardComponent', () => {
  let component: PublicHomeListEventsSpeakersCardComponent;
  let fixture: ComponentFixture<PublicHomeListEventsSpeakersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsSpeakersCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsSpeakersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
