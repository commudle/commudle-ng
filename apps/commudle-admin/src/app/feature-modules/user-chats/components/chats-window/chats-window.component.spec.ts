import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatsWindowComponent} from './chats-window.component';

describe('ChatsWindowComponent', () => {
  let component: ChatsWindowComponent;
  let fixture: ComponentFixture<ChatsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatsWindowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
