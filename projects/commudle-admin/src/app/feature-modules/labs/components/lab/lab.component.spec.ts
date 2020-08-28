import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabComponent } from './lab.component';

describe('LabComponent', () => {
  let component: LabComponent;
  let fixture: ComponentFixture<LabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
