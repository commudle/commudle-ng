import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatusBarComponent } from './profile-status-bar.component';

describe('UserProfileCompleteBarComponent', () => {
  let component: ProfileStatusBarComponent;
  let fixture: ComponentFixture<ProfileStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileStatusBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
