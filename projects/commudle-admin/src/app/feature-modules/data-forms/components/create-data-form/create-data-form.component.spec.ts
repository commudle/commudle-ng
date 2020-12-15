import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateDataFormComponent } from './create-data-form.component';

describe('CreateDataFormComponent', () => {
  let component: CreateDataFormComponent;
  let fixture: ComponentFixture<CreateDataFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
