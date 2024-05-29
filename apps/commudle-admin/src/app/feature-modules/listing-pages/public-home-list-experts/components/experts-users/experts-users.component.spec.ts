import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsUsersComponent } from './experts-users.component';

describe('ExpertsUsersComponent', () => {
  let component: ExpertsUsersComponent;
  let fixture: ComponentFixture<ExpertsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertsUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
