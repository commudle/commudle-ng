import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListCardComponent } from './job-list-card.component';

describe('JobListCardComponent', () => {
  let component: JobListCardComponent;
  let fixture: ComponentFixture<JobListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobListCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
