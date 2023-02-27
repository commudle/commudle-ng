import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPassScanComponent } from './entry-pass-scan.component';

describe('EntryPassScanComponent', () => {
  let component: EntryPassScanComponent;
  let fixture: ComponentFixture<EntryPassScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryPassScanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPassScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
