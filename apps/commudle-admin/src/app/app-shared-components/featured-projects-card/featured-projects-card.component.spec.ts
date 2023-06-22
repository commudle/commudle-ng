import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProjectsCardComponent } from './featured-projects-card.component';

describe('FeaturedProjectsCardComponent', () => {
  let component: FeaturedProjectsCardComponent;
  let fixture: ComponentFixture<FeaturedProjectsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProjectsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProjectsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
