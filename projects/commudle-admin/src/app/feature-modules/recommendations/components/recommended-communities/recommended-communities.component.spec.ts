import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedCommunitiesComponent } from './recommended-communities.component';

describe('RecommendedCommunitiesComponent', () => {
  let component: RecommendedCommunitiesComponent;
  let fixture: ComponentFixture<RecommendedCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendedCommunitiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
