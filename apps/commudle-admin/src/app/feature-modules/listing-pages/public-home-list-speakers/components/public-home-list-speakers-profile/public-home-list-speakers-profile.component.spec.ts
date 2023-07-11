import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListSpeakersProfileComponent } from './public-home-list-speakers-profile.component';

describe('PublicHomeListSpeakersProfileComponent', () => {
  let component: PublicHomeListSpeakersProfileComponent;
  let fixture: ComponentFixture<PublicHomeListSpeakersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListSpeakersProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListSpeakersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
