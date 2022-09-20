import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLiveStatusComponent } from './user-live-status.component';

describe('UserLiveStatusComponent', () => {
  let component: UserLiveStatusComponent;
  let fixture: ComponentFixture<UserLiveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLiveStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
