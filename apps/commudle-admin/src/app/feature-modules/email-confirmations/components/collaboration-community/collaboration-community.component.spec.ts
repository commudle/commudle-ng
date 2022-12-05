import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollaborationCommunityComponent } from './collaboration-community.component';

describe('CollaborationCommunityComponent', () => {
  let component: CollaborationCommunityComponent;
  let fixture: ComponentFixture<CollaborationCommunityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
