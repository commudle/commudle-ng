import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularProgressiveBarComponent } from './circular-progressive-bar.component';

describe('CircularProgressiveBarComponent', () => {
  let component: CircularProgressiveBarComponent;
  let fixture: ComponentFixture<CircularProgressiveBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircularProgressiveBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularProgressiveBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
