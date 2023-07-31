import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySurveysComponent } from './community-surveys.component';

describe('CommunitySurveysComponent', () => {
  let component: CommunitySurveysComponent;
  let fixture: ComponentFixture<CommunitySurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitySurveysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunitySurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
