import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponsesComponent } from './form-responses.component';

describe('FormResponsesComponent', () => {
  let component: FormResponsesComponent;
  let fixture: ComponentFixture<FormResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
