import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCommunityBuildComponent } from './create-community-build.component';

describe('CreateCommunityBuildComponent', () => {
  let component: CreateCommunityBuildComponent;
  let fixture: ComponentFixture<CreateCommunityBuildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommunityBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommunityBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
