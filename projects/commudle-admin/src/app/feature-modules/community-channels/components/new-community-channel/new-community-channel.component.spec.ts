import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommunityChannelComponent } from './new-community-channel.component';

describe('NewCommunityChannelComponent', () => {
  let component: NewCommunityChannelComponent;
  let fixture: ComponentFixture<NewCommunityChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCommunityChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCommunityChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
