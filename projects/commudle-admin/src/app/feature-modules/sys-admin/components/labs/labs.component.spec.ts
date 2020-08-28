import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsComponent } from './labs.component';

describe('LabsComponent', () => {
  let component: LabsComponent;
  let fixture: ComponentFixture<LabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
