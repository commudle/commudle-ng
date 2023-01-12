import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedBuildsComponent } from './recommended-builds.component';

describe('RecommendedBuildsComponent', () => {
  let component: RecommendedBuildsComponent;
  let fixture: ComponentFixture<RecommendedBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendedBuildsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
