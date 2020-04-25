import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillDataFormComponent } from './fill-data-form.component';

describe('FillDataFormComponent', () => {
  let component: FillDataFormComponent;
  let fixture: ComponentFixture<FillDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
