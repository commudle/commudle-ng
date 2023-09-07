import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityForumMessageComponent } from './community-forum-message.component';

describe('CommunityFormMessageComponent', () => {
  let component: CommunityForumMessageComponent;
  let fixture: ComponentFixture<CommunityForumMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityForumMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityForumMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
