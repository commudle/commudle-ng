import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkInProgressComponent } from './work-in-progress.component';

describe('WorkInProgressComponent', () => {
  let component: WorkInProgressComponent;
  let fixture: ComponentFixture<WorkInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
