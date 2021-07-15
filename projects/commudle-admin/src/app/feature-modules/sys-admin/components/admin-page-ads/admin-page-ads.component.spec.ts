import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAdsComponent } from './admin-page-ads.component';

describe('AdminPageAdsComponent', () => {
  let component: AdminPageAdsComponent;
  let fixture: ComponentFixture<AdminPageAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
