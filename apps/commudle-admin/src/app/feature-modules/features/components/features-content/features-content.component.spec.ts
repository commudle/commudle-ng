import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesContentComponent } from './features-content.component';

describe('FeaturesContentComponent', () => {
  let component: FeaturesContentComponent;
  let fixture: ComponentFixture<FeaturesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturesContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
