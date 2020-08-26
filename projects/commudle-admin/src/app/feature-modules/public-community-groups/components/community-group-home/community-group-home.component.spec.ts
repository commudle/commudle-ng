import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGroupHomeComponent } from './community-group-home.component';

describe('CommunityGroupHomeComponent', () => {
  let component: CommunityGroupHomeComponent;
  let fixture: ComponentFixture<CommunityGroupHomeComponent>;

  beforeEach(async(() => {
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
