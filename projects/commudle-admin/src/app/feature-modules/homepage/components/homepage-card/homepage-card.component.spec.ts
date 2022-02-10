import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCardComponent } from './homepage-card.component';

describe('HomepageCardComponent', () => {
  let component: HomepageCardComponent;
  let fixture: ComponentFixture<HomepageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
