import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBadgeComponent } from './community-badge.component';

describe('CommunityBadgeComponent', () => {
  let component: CommunityBadgeComponent;
  let fixture: ComponentFixture<CommunityBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
