import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFormComponent } from './invite-form.component';

describe('InviteFormComponent', () => {
  let component: InviteFormComponent;
  let fixture: ComponentFixture<InviteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
