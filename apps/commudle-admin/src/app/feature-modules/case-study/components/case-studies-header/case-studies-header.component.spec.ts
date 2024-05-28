import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesHeaderComponent } from './case-studies-header.component';

describe('CaseStudiesHeaderComponent', () => {
  let component: CaseStudiesHeaderComponent;
  let fixture: ComponentFixture<CaseStudiesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseStudiesHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
