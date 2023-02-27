import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaticAssetsListComponent } from './admin-static-assets-list.component';

describe('AdminStaticAssetsListComponent', () => {
  let component: AdminStaticAssetsListComponent;
  let fixture: ComponentFixture<AdminStaticAssetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaticAssetsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaticAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
