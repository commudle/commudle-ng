import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListSpeakersContentComponent } from './public-home-list-speakers-content.component';

describe('PublicHomeListSpeakersContentComponent', () => {
  let component: PublicHomeListSpeakersContentComponent;
  let fixture: ComponentFixture<PublicHomeListSpeakersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListSpeakersContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListSpeakersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
