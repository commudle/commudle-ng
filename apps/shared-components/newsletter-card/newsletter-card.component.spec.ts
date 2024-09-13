import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterCardComponent } from './newsletter-card.component';

describe('NewsletterCardComponent', () => {
  let component: NewsletterCardComponent;
  let fixture: ComponentFixture<NewsletterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsletterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsletterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
