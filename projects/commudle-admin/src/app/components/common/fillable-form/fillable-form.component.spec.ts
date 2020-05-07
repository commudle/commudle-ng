import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillableFormComponent } from './fillable-form.component';

describe('FillableFormComponent', () => {
  let component: FillableFormComponent;
  let fixture: ComponentFixture<FillableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
