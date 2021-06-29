import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterSchedulerComponent } from './main-newsletter-scheduler.component';

describe('MainNewsletterSchedulerComponent', () => {
  let component: MainNewsletterSchedulerComponent;
  let fixture: ComponentFixture<MainNewsletterSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
