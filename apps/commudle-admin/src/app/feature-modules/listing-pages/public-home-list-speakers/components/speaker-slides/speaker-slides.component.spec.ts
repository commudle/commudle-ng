import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerSlidesComponent } from './speaker-slides.component';

describe('SpeakerSlidesComponent', () => {
  let component: SpeakerSlidesComponent;
  let fixture: ComponentFixture<SpeakerSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerSlidesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
