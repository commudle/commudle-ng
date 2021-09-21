import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamV2Component } from './video-stream-v2.component';

describe('VideoStreamV2Component', () => {
  let component: VideoStreamV2Component;
  let fixture: ComponentFixture<VideoStreamV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoStreamV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStreamV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
