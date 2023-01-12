import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserExtraDetailsComponent} from './user-extra-details.component';

describe('UserExtraDetailsComponent', () => {
  let component: UserExtraDetailsComponent;
  let fixture: ComponentFixture<UserExtraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserExtraDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExtraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
