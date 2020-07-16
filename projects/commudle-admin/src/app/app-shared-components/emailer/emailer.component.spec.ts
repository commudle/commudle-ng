import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailerComponent } from './emailer.component';

describe('EmailerComponent', () => {
  let component: EmailerComponent;
  let fixture: ComponentFixture<EmailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
