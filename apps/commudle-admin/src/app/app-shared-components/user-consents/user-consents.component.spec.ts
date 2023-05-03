import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsentsComponent } from './user-consents.component';

describe('UserConsentsComponent', () => {
  let component: UserConsentsComponent;
  let fixture: ComponentFixture<UserConsentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserConsentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserConsentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
