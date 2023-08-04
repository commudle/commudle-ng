import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCommunityBuildsComponent } from './featured-community-builds.component';

describe('FeaturedCommunityBuildsComponent', () => {
  let component: FeaturedCommunityBuildsComponent;
  let fixture: ComponentFixture<FeaturedCommunityBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedCommunityBuildsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCommunityBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
