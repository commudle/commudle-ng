import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityCreateComponent } from './community-create.component';

describe('CommunityCreateComponent', () => {
  let component: CommunityCreateComponent;
  let fixture: ComponentFixture<CommunityCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
