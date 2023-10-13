import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAgendaComponent } from './events-agenda.component';

describe('EventsAgendaComponent', () => {
  let component: EventsAgendaComponent;
  let fixture: ComponentFixture<EventsAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsAgendaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
