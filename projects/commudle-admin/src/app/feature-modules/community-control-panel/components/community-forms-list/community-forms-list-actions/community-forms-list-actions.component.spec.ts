import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityFormsListActionsComponent } from './community-forms-list-actions.component';

describe('CommunityFormsListActionsComponent', () => {
  let component: CommunityFormsListActionsComponent;
  let fixture: ComponentFixture<CommunityFormsListActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityFormsListActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFormsListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
