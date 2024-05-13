import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyTaaranganaHeaderComponent } from './case-study-taarangana-header.component';

describe('CaseStudyTaaranganaHeaderComponent', () => {
  let component: CaseStudyTaaranganaHeaderComponent;
  let fixture: ComponentFixture<CaseStudyTaaranganaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseStudyTaaranganaHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyTaaranganaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
