import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyTaaranganaComponent } from './case-study-taarangana.component';

describe('CaseStudyTaaranganaComponent', () => {
  let component: CaseStudyTaaranganaComponent;
  let fixture: ComponentFixture<CaseStudyTaaranganaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseStudyTaaranganaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyTaaranganaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
