import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCommunityGroupsComponent } from './public-community-groups.component';

describe('PublicCommunityGroupsComponent', () => {
  let component: PublicCommunityGroupsComponent;
  let fixture: ComponentFixture<PublicCommunityGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicCommunityGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCommunityGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
