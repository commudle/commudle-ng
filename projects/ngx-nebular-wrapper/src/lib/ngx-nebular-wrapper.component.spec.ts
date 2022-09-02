import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNebularWrapperComponent } from './ngx-nebular-wrapper.component';

describe('NgxNebularWrapperComponent', () => {
  let component: NgxNebularWrapperComponent;
  let fixture: ComponentFixture<NgxNebularWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxNebularWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNebularWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
