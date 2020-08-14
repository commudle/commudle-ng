import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatComponent } from './user-chat.component';

describe('UserChatComponent', () => {
  let component: UserChatComponent;
  let fixture: ComponentFixture<UserChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
