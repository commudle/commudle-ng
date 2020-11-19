import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChannelSettingsComponent } from './channel-settings.component';

describe('ChannelSettingsComponent', () => {
  let component: ChannelSettingsComponent;
  let fixture: ComponentFixture<ChannelSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
