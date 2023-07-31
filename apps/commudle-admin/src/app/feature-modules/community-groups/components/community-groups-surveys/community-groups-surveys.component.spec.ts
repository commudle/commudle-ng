import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGroupsSurveysComponent } from './community-groups-surveys.component';

describe('CommunityGroupsSurveysComponent', () => {
  let component: CommunityGroupsSurveysComponent;
  let fixture: ComponentFixture<CommunityGroupsSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityGroupsSurveysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityGroupsSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
