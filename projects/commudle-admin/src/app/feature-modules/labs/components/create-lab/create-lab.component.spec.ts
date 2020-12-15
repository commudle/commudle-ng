import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateLabComponent } from './create-lab.component';

describe('CreateLabComponent', () => {
  let component: CreateLabComponent;
  let fixture: ComponentFixture<CreateLabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
