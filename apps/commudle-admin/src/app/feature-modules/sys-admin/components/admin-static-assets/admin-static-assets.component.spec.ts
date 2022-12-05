import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaticAssetsComponent } from './admin-static-assets.component';

describe('AdminStaticAssetsComponent', () => {
  let component: AdminStaticAssetsComponent;
  let fixture: ComponentFixture<AdminStaticAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaticAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaticAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
