import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailJoinComponent } from './email-join.component';

describe('EmailJoinComponent', () => {
  let component: EmailJoinComponent;
  let fixture: ComponentFixture<EmailJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
