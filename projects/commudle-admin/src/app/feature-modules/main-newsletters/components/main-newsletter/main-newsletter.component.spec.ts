import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterComponent } from './main-newsletter.component';

describe('MainNewsletterComponent', () => {
  let component: MainNewsletterComponent;
  let fixture: ComponentFixture<MainNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
