import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreExpertsComponent } from './explore-experts.component';

describe('ExploreExpertsComponent', () => {
  let component: ExploreExpertsComponent;
  let fixture: ComponentFixture<ExploreExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreExpertsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
