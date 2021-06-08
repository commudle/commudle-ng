import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBasicSocialComponent} from './user-basic-social.component';

describe('UserBasicSocialComponent', () => {
  let component: UserBasicSocialComponent;
  let fixture: ComponentFixture<UserBasicSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBasicSocialComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBasicSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
