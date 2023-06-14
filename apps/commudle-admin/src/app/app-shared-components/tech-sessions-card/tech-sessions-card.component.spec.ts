import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSessionsCardComponent } from './tech-sessions-card.component';

describe('PublicHomeListEventsTechSessionsCardComponent', () => {
  let component: TechSessionsCardComponent;
  let fixture: ComponentFixture<TechSessionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechSessionsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechSessionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
