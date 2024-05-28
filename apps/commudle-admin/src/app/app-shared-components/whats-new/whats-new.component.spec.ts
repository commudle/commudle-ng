import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewComponent } from './whats-new.component';

describe('WhatsNewComponent', () => {
  let component: WhatsNewComponent;
  let fixture: ComponentFixture<WhatsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
