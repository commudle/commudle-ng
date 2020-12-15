import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwUpdateComponent } from './sw-update.component';

describe('SwUpdateComponent', () => {
  let component: SwUpdateComponent;
  let fixture: ComponentFixture<SwUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
