import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmsBeamComponent } from './hms-beam.component';

describe('HmsBeamComponent', () => {
  let component: HmsBeamComponent;
  let fixture: ComponentFixture<HmsBeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmsBeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsBeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
