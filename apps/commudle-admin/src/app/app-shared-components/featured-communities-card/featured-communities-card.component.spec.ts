import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCommunitiesCardComponent } from './featured-communities-card.component';

describe('FeaturedCommunitiesCardComponent', () => {
  let component: FeaturedCommunitiesCardComponent;
  let fixture: ComponentFixture<FeaturedCommunitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedCommunitiesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCommunitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
