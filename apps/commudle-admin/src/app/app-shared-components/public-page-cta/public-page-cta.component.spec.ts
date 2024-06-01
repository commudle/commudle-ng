import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageCtaComponent } from './public-page-cta.component';

describe('PublicPageCtaComponent', () => {
  let component: PublicPageCtaComponent;
  let fixture: ComponentFixture<PublicPageCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicPageCtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicPageCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
