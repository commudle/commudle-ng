import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityFormsListComponent } from './community-forms-list.component';

describe('CommunityFormsListComponent', () => {
  let component: CommunityFormsListComponent;
  let fixture: ComponentFixture<CommunityFormsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityFormsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
