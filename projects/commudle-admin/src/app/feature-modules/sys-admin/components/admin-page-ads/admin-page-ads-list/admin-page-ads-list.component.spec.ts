import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAdsListComponent } from './admin-page-ads-list.component';

describe('AdminPageAdsListComponent', () => {
  let component: AdminPageAdsListComponent;
  let fixture: ComponentFixture<AdminPageAdsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageAdsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageAdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
