import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterEmailStatsComponent } from './main-newsletter-email-stats.component';

describe('MainNewsletterEmailStatsComponent', () => {
  let component: MainNewsletterEmailStatsComponent;
  let fixture: ComponentFixture<MainNewsletterEmailStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterEmailStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterEmailStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
