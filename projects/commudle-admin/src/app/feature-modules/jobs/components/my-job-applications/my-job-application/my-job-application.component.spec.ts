import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobApplicationComponent } from './my-job-application.component';

describe('MyJobApplicationComponent', () => {
  let component: MyJobApplicationComponent;
  let fixture: ComponentFixture<MyJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyJobApplicationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
