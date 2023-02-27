import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityGroupHomeComponent } from './community-group-home.component';

describe('CommunityGroupHomeComponent', () => {
  let component: CommunityGroupHomeComponent;
  let fixture: ComponentFixture<CommunityGroupHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityGroupHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
