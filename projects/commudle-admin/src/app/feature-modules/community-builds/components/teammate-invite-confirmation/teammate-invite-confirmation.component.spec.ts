import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateInviteConfirmationComponent } from './teammate-invite-confirmation.component';

describe('TeammateInviteConfirmationComponent', () => {
  let component: TeammateInviteConfirmationComponent;
  let fixture: ComponentFixture<TeammateInviteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeammateInviteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammateInviteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
