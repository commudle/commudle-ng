import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsPastCardComponent } from './public-home-list-events-past-card.component';

describe('PublicHomeListEventsPastCardComponent', () => {
  let component: PublicHomeListEventsPastCardComponent;
  let fixture: ComponentFixture<PublicHomeListEventsPastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsPastCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsPastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
