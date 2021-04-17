import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExternalFeedLinksComponent } from './home-external-feed-links.component';

describe('HomeExternalFeedLinksComponent', () => {
  let component: HomeExternalFeedLinksComponent;
  let fixture: ComponentFixture<HomeExternalFeedLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeExternalFeedLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExternalFeedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
