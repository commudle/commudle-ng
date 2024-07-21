import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDictionaryIframeComponent } from './help-dictionary-iframe.component';

describe('HelpDictionaryIframeComponent', () => {
  let component: HelpDictionaryIframeComponent;
  let fixture: ComponentFixture<HelpDictionaryIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpDictionaryIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpDictionaryIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
