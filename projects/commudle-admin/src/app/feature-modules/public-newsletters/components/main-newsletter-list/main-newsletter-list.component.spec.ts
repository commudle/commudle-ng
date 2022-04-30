import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewsletterList } from './main-newsletter-list.component';

describe('MainNewsletterList', () => {
  let component: MainNewsletterList;
  let fixture: ComponentFixture<MainNewsletterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewsletterList ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewsletterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
