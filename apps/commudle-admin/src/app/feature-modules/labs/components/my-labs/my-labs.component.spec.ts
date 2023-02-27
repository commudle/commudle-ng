import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyLabsComponent } from './my-labs.component';

describe('MyLabsComponent', () => {
  let component: MyLabsComponent;
  let fixture: ComponentFixture<MyLabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
