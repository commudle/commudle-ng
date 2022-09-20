import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdsComponent } from './page-ads.component';

describe('PageAdsComponent', () => {
  let component: PageAdsComponent;
  let fixture: ComponentFixture<PageAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAdsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
