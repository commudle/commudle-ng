import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsFeaturedCommunitiesCardComponent } from './public-home-list-events-featured-communities-card.component';

describe('PublicHomeListEventsFeaturedCommunitiesCardComponent', () => {
  let component: PublicHomeListEventsFeaturedCommunitiesCardComponent;
  let fixture: ComponentFixture<PublicHomeListEventsFeaturedCommunitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsFeaturedCommunitiesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsFeaturedCommunitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
