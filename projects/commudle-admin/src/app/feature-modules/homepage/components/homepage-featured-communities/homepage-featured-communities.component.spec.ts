import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFeaturedCommunitiesComponent } from './homepage-featured-communities.component';

describe('HomepageFeaturedCommunitiesComponent', () => {
  let component: HomepageFeaturedCommunitiesComponent;
  let fixture: ComponentFixture<HomepageFeaturedCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageFeaturedCommunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageFeaturedCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
