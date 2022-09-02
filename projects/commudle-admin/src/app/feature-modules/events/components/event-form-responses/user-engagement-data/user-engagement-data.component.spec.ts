import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEngagementDataComponent } from './user-engagement-data.component';

describe('UserEngagementDataComponent', () => {
  let component: UserEngagementDataComponent;
  let fixture: ComponentFixture<UserEngagementDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEngagementDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEngagementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
