import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageStatsComponent } from './public-page-stats.component';

describe('PublicPageStatsComponent', () => {
  let component: PublicPageStatsComponent;
  let fixture: ComponentFixture<PublicPageStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicPageStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicPageStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
