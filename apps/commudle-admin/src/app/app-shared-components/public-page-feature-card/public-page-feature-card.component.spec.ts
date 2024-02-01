import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageFeatureSectionComponent } from './public-page-feature-card.component';

describe('PublicPageFeatureSectionComponent', () => {
  let component: PublicPageFeatureSectionComponent;
  let fixture: ComponentFixture<PublicPageFeatureSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicPageFeatureSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicPageFeatureSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
