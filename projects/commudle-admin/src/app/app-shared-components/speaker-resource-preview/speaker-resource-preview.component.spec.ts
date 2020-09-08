import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerResourcePreviewComponent } from './speaker-resource-preview.component';

describe('SpeakerResourcePreviewComponent', () => {
  let component: SpeakerResourcePreviewComponent;
  let fixture: ComponentFixture<SpeakerResourcePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerResourcePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerResourcePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
