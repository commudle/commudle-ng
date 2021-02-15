import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatsContainerComponent} from './chats-container.component';

describe('ChatsContainerComponent', () => {
  let component: ChatsContainerComponent;
  let fixture: ComponentFixture<ChatsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatsContainerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
