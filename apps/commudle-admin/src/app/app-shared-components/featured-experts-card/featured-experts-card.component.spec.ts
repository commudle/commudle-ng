import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedExpertsCardComponent } from './featured-experts-card.component';

describe('FeaturedExpertsCardComponent', () => {
  let component: FeaturedExpertsCardComponent;
  let fixture: ComponentFixture<FeaturedExpertsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedExpertsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedExpertsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
