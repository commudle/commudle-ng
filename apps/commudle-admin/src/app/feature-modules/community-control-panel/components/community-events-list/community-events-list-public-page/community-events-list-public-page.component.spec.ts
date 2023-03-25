import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityEventsListPublicPageComponent } from './community-events-list-public-page.component';

describe('CommunityEventsListPublicPageComponent', () => {
  let component: CommunityEventsListPublicPageComponent;
  let fixture: ComponentFixture<CommunityEventsListPublicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityEventsListPublicPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityEventsListPublicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
