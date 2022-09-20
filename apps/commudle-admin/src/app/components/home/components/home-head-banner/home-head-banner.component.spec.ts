import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeadBannerComponent } from './home-head-banner.component';

describe('HomeHeadBannerComponent', () => {
  let component: HomeHeadBannerComponent;
  let fixture: ComponentFixture<HomeHeadBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeHeadBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeadBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
