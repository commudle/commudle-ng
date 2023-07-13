import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListSpeakersComponent } from './public-home-list-speakers.component';

describe('PublicHomeListSpeakersComponent', () => {
  let component: PublicHomeListSpeakersComponent;
  let fixture: ComponentFixture<PublicHomeListSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListSpeakersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
