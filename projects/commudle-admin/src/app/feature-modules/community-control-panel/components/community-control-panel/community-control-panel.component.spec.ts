import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityControlPanelComponent } from './community-control-panel.component';

describe('CommunityControlPanelComponent', () => {
  let component: CommunityControlPanelComponent;
  let fixture: ComponentFixture<CommunityControlPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
