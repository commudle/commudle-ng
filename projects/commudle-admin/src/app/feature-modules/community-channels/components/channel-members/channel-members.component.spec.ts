import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMembersComponent } from './channel-members.component';

describe('ChannelMembersComponent', () => {
  let component: ChannelMembersComponent;
  let fixture: ComponentFixture<ChannelMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
