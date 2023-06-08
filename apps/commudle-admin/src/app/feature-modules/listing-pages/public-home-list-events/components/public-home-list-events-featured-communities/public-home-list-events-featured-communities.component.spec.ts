import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsFeaturedCommunitiesComponent } from './public-home-list-events-featured-communities.component';

describe('PublicHomeListEventsFeaturedCommunitiesComponent', () => {
  let component: PublicHomeListEventsFeaturedCommunitiesComponent;
  let fixture: ComponentFixture<PublicHomeListEventsFeaturedCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsFeaturedCommunitiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsFeaturedCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
