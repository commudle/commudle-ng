import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterListItemComponent } from './main-newsletter-list-item.component';

describe('MainNewsletterListItemComponent', () => {
  let component: MainNewsletterListItemComponent;
  let fixture: ComponentFixture<MainNewsletterListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
