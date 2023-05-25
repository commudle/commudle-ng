import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsPastComponent } from './public-home-list-events-past.component';

describe('PublicHomeListEventsPastComponent', () => {
  let component: PublicHomeListEventsPastComponent;
  let fixture: ComponentFixture<PublicHomeListEventsPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsPastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
