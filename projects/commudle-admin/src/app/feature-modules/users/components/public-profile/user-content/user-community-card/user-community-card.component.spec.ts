
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCommunityCardComponent} from './user-community-card.component';

describe('UserCommunityCardComponent', () => {
  let component: UserCommunityCardComponent;
  let fixture: ComponentFixture<UserCommunityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [UserCommunityCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommunityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
