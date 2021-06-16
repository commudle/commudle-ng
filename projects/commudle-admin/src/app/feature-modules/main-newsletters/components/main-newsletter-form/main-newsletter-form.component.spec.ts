import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterFormComponent } from './main-newsletter-form.component';

describe('MainNewsletterFormComponent', () => {
  let component: MainNewsletterFormComponent;
  let fixture: ComponentFixture<MainNewsletterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
