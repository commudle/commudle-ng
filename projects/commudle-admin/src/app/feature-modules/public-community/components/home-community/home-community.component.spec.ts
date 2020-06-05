import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommunityComponent } from './home-community.component';

describe('HomeCommunityComponent', () => {
  let component: HomeCommunityComponent;
  let fixture: ComponentFixture<HomeCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
