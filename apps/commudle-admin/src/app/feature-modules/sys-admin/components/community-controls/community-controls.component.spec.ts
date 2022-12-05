import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityControlsComponent } from './community-controls.component';

describe('CommunityControlsComponent', () => {
  let component: CommunityControlsComponent;
  let fixture: ComponentFixture<CommunityControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
