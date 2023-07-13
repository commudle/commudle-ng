import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityForumComponent } from './community-forum.component';

describe('CommunityForumComponent', () => {
  let component: CommunityForumComponent;
  let fixture: ComponentFixture<CommunityForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityForumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
