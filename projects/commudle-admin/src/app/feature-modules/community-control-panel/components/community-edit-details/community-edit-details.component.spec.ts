import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityEditDetailsComponent } from './community-edit-details.component';

describe('CommunityEditDetailsComponent', () => {
  let component: CommunityEditDetailsComponent;
  let fixture: ComponentFixture<CommunityEditDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
