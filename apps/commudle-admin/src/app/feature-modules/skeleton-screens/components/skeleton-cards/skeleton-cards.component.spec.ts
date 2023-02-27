import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardsComponent } from './skeleton-cards.component';

describe('SkeletonCardsComponent', () => {
  let component: SkeletonCardsComponent;
  let fixture: ComponentFixture<SkeletonCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonCardsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
