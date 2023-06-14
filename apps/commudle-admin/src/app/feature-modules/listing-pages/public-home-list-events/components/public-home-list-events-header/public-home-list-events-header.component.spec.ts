import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsHeaderComponent } from './public-home-list-events-header.component';

describe('PublicHomeListEventsHeaderComponent', () => {
  let component: PublicHomeListEventsHeaderComponent;
  let fixture: ComponentFixture<PublicHomeListEventsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
