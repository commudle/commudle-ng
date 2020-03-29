import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFormsListComponent } from './community-forms-list.component';

describe('CommunityFormsListComponent', () => {
  let component: CommunityFormsListComponent;
  let fixture: ComponentFixture<CommunityFormsListComponent>;

  beforeEach(async(() => {
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
