import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceV2Component } from './conference-v2.component';

describe('ConferenceV2Component', () => {
  let component: ConferenceV2Component;
  let fixture: ComponentFixture<ConferenceV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceV2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
