import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesCardComponent } from './case-studies-card.component';

describe('CaseStudiesCardComponent', () => {
  let component: CaseStudiesCardComponent;
  let fixture: ComponentFixture<CaseStudiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseStudiesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
