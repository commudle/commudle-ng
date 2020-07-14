import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBuildDetailsComponent } from './community-build-details.component';

describe('CommunityBuildDetailsComponent', () => {
  let component: CommunityBuildDetailsComponent;
  let fixture: ComponentFixture<CommunityBuildDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBuildDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBuildDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
