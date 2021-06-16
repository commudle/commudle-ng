import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGroupAboutComponent } from './community-group-about.component';

describe('CommunityGroupAboutComponent', () => {
  let component: CommunityGroupAboutComponent;
  let fixture: ComponentFixture<CommunityGroupAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityGroupAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
