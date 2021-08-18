import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceUserVideoComponent } from './conference-user-video.component';

describe('ConferenceUserVideoComponent', () => {
  let component: ConferenceUserVideoComponent;
  let fixture: ComponentFixture<ConferenceUserVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceUserVideoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceUserVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
