import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChannelsComponent } from './community-channels.component';

describe('CommunityChannelsComponent', () => {
  let component: CommunityChannelsComponent;
  let fixture: ComponentFixture<CommunityChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityChannelsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
