import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageLayoutComponent } from './public-page-layout.component';

describe('PublicPageLayoutComponent', () => {
  let component: PublicPageLayoutComponent;
  let fixture: ComponentFixture<PublicPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicPageLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
