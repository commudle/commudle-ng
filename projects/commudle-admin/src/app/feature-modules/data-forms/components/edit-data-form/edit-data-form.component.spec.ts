import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditDataFormComponent } from './edit-data-form.component';

describe('EditDataFormComponent', () => {
  let component: EditDataFormComponent;
  let fixture: ComponentFixture<EditDataFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
