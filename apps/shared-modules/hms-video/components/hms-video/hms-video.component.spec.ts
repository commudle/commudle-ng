import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmsVideoComponent } from './hms-video.component';

describe('HmsVideoComponent', () => {
  let component: HmsVideoComponent;
  let fixture: ComponentFixture<HmsVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmsVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
