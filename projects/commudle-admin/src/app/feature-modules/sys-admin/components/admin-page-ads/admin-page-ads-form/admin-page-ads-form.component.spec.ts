import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAdsFormComponent } from './admin-page-ads-form.component';

describe('AdminPageAdsFormComponent', () => {
  let component: AdminPageAdsFormComponent;
  let fixture: ComponentFixture<AdminPageAdsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageAdsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageAdsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
