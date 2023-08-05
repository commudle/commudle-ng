import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsFeaturedCardComponent } from './labs-featured-card.component';

describe('LabsFeaturedCardComponent', () => {
  let component: LabsFeaturedCardComponent;
  let fixture: ComponentFixture<LabsFeaturedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabsFeaturedCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabsFeaturedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
