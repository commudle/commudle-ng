import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabComponent } from './edit-lab.component';

describe('EditLabComponent', () => {
  let component: EditLabComponent;
  let fixture: ComponentFixture<EditLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
