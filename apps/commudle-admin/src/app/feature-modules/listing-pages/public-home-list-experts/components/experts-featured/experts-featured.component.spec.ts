import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsFeaturedComponent } from './experts-featured.component';

describe('ExpertsFeaturedComponent', () => {
  let component: ExpertsFeaturedComponent;
  let fixture: ComponentFixture<ExpertsFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertsFeaturedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertsFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
