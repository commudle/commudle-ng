import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTestimonialsComponent } from './homepage-testimonials.component';

describe('HomepageTestimonialsComponent', () => {
  let component: HomepageTestimonialsComponent;
  let fixture: ComponentFixture<HomepageTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageTestimonialsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
