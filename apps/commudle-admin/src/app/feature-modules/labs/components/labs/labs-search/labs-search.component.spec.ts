import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsSearchComponent } from './labs-search.component';

describe('LabsSearchComponent', () => {
  let component: LabsSearchComponent;
  let fixture: ComponentFixture<LabsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabsSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
