import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGroupFormComponent } from './community-group-form.component';

describe('CommunityGroupFormComponent', () => {
  let component: CommunityGroupFormComponent;
  let fixture: ComponentFixture<CommunityGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
