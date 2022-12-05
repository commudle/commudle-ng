import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageExpertsComponent } from './homepage-experts.component';

describe('HomepageExpertsComponent', () => {
  let component: HomepageExpertsComponent;
  let fixture: ComponentFixture<HomepageExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageExpertsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
