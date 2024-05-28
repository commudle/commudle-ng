import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyHeaderComponent } from './case-study-header.component';

describe('CaseStudyHeaderComponent', () => {
  let component: CaseStudyHeaderComponent;
  let fixture: ComponentFixture<CaseStudyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseStudyHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
