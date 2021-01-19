import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalPreviewComponent } from './local-preview.component';

describe('LocalPreviewComponent', () => {
  let component: LocalPreviewComponent;
  let fixture: ComponentFixture<LocalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
