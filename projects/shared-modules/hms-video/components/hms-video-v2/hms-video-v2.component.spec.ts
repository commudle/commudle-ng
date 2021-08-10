import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HmsVideoV2Component } from './hms-video-v2.component';

describe('HmsVideoV2Component', () => {
  let component: HmsVideoV2Component;
  let fixture: ComponentFixture<HmsVideoV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HmsVideoV2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsVideoV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
