import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsComponent } from './public-home-list-events.component';

describe('PublicHomeListEventsComponent', () => {
  let component: PublicHomeListEventsComponent;
  let fixture: ComponentFixture<PublicHomeListEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
