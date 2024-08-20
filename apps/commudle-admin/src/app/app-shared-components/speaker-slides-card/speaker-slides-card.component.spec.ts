import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSlidesCardComponent } from './speaker-slides-card.component';

describe('SpeakerSlidesCardComponent', () => {
  let component: SpeakerSlidesCardComponent;
  let fixture: ComponentFixture<SpeakerSlidesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerSlidesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerSlidesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
