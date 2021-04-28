import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CreateNewsletterComponent } from './create-newsletter.component';


describe('CreateNewsletterComponent', () => {
  let component: CreateNewsletterComponent;
  let fixture: ComponentFixture<CreateNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewsletterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
