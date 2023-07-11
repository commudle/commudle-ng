import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakersHeaderComponent } from './speakers-header.component';

describe('SpeakersHeaderComponent', () => {
  let component: SpeakersHeaderComponent;
  let fixture: ComponentFixture<SpeakersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakersHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
