import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedLabsComponent } from './recommended-labs.component';

describe('RecommendedLabsComponent', () => {
  let component: RecommendedLabsComponent;
  let fixture: ComponentFixture<RecommendedLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendedLabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
