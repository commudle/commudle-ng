import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonVerticalCardsComponent } from './skeleton-vertical-cards.component';

describe('SkeletonVerticalCardsComponent', () => {
  let component: SkeletonVerticalCardsComponent;
  let fixture: ComponentFixture<SkeletonVerticalCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonVerticalCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonVerticalCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
