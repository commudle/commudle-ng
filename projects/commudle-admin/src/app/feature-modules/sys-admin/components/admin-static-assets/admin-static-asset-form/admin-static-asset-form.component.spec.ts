import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaticAssetFormComponent } from './admin-static-asset-form.component';

describe('AdminStaticAssetFormComponent', () => {
  let component: AdminStaticAssetFormComponent;
  let fixture: ComponentFixture<AdminStaticAssetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaticAssetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaticAssetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
