import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyCommunityBuildsComponent } from './my-community-builds.component';

describe('MyCommunityBuildsComponent', () => {
  let component: MyCommunityBuildsComponent;
  let fixture: ComponentFixture<MyCommunityBuildsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommunityBuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommunityBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
