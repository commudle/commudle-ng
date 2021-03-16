import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeCommunityCardComponent } from './home-community-card.component';

describe('HomeCommunityCardComponent', () => {
  let component: HomeCommunityCardComponent;
  let fixture: ComponentFixture<HomeCommunityCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCommunityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
