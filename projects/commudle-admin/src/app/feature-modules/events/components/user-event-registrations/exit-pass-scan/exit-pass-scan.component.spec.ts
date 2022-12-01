import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitPassScanComponent } from './exit-pass-scan.component';

describe('ExitPassScanComponent', () => {
  let component: ExitPassScanComponent;
  let fixture: ComponentFixture<ExitPassScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExitPassScanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitPassScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
