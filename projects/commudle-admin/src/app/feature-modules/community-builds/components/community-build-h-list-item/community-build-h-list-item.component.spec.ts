import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBuildHListItemComponent } from './community-build-h-list-item.component';

describe('CommunityBuildHListItemComponent', () => {
  let component: CommunityBuildHListItemComponent;
  let fixture: ComponentFixture<CommunityBuildHListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBuildHListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBuildHListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
