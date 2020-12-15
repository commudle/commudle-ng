import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityBuildComponent } from './community-build.component';

describe('CommunityBuildComponent', () => {
  let component: CommunityBuildComponent;
  let fixture: ComponentFixture<CommunityBuildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
