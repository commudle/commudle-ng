import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGroupsComponent } from './form-groups.component';

describe('FormGroupsComponent', () => {
  let component: FormGroupsComponent;
  let fixture: ComponentFixture<FormGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
