import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCommunityCardMediumComponent } from './featured-community-card-medium.component';

describe('FeaturedCommunityCardMediumComponent', () => {
  let component: FeaturedCommunityCardMediumComponent;
  let fixture: ComponentFixture<FeaturedCommunityCardMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedCommunityCardMediumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCommunityCardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
