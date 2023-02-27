import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterTestEmailerComponent } from './main-newsletter-test-emailer.component';

describe('MainNewsletterTestEmailerComponent', () => {
  let component: MainNewsletterTestEmailerComponent;
  let fixture: ComponentFixture<MainNewsletterTestEmailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterTestEmailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterTestEmailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
