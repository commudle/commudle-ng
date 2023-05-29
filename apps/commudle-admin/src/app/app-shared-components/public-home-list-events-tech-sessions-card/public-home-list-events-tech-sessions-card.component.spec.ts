import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsTechSessionsCardComponent } from './public-home-list-events-tech-sessions-card.component';

describe('PublicHomeListEventsTechSessionsCardComponent', () => {
  let component: PublicHomeListEventsTechSessionsCardComponent;
  let fixture: ComponentFixture<PublicHomeListEventsTechSessionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsTechSessionsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsTechSessionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
