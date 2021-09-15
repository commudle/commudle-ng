import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalPreviewV2Component } from './local-preview-v2.component';

describe('LocalPreviewV2Component', () => {
  let component: LocalPreviewV2Component;
  let fixture: ComponentFixture<LocalPreviewV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalPreviewV2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalPreviewV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
