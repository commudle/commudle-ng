import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonHorizontalCardComponent } from './hackathon-horizontal-card.component';

describe('HackathonHorizontalCardComponent', () => {
  let component: HackathonHorizontalCardComponent;
  let fixture: ComponentFixture<HackathonHorizontalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackathonHorizontalCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HackathonHorizontalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
