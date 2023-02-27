import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommunityChannelFormComponent } from './community-channel-form.component';

describe('CommunityChannelFormComponent', () => {
  let component: CommunityChannelFormComponent;
  let fixture: ComponentFixture<CommunityChannelFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityChannelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
