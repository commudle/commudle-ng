import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsSpeakersComponent } from './public-home-list-events-speakers.component';

describe('PublicHomeListEventsSpeakersComponent', () => {
  let component: PublicHomeListEventsSpeakersComponent;
  let fixture: ComponentFixture<PublicHomeListEventsSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsSpeakersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
