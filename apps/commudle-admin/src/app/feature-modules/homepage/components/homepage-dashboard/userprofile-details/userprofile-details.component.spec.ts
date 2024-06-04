import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileDetailsComponent } from './userprofile-details.component';

describe('UserprofileDetailsComponent', () => {
  let component: UserprofileDetailsComponent;
  let fixture: ComponentFixture<UserprofileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserprofileDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserprofileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
