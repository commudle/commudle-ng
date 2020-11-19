import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicUserProfileComponent } from './basic-user-profile.component';

describe('BasicUserProfileComponent', () => {
  let component: BasicUserProfileComponent;
  let fixture: ComponentFixture<BasicUserProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
