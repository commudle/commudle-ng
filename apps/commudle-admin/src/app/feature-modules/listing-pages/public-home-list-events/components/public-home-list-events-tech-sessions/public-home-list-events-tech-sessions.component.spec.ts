import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListEventsTechSessionsComponent } from './public-home-list-events-tech-sessions.component';

describe('PublicHomeListEventsTechSessionsComponent', () => {
  let component: PublicHomeListEventsTechSessionsComponent;
  let fixture: ComponentFixture<PublicHomeListEventsTechSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListEventsTechSessionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListEventsTechSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
