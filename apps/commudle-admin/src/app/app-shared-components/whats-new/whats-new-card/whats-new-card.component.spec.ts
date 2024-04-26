import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewCardComponent } from './whats-new-card.component';

describe('WhatsNewCardComponent', () => {
  let component: WhatsNewCardComponent;
  let fixture: ComponentFixture<WhatsNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsNewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
