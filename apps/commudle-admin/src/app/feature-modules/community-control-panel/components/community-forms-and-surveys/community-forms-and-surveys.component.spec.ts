import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFormsAndSurveysComponent } from './community-forms-and-surveys.component';

describe('CommunityFormsAndSurveysComponent', () => {
  let component: CommunityFormsAndSurveysComponent;
  let fixture: ComponentFixture<CommunityFormsAndSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityFormsAndSurveysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityFormsAndSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
