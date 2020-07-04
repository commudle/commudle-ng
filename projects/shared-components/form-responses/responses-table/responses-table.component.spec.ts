import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesTableComponent } from './responses-table.component';

describe('ResponsesTableComponent', () => {
  let component: ResponsesTableComponent;
  let fixture: ComponentFixture<ResponsesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
