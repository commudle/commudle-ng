import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibAuthwatchComponent } from './lib-authwatch.component';

describe('LibAuthwatchComponent', () => {
  let component: LibAuthwatchComponent;
  let fixture: ComponentFixture<LibAuthwatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibAuthwatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibAuthwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
