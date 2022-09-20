import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerResourceComponent } from './speaker-resource.component';

describe('SpeakerResourceComponent', () => {
  let component: SpeakerResourceComponent;
  let fixture: ComponentFixture<SpeakerResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
