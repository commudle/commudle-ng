import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollaborationCommunitiesComponent } from './collaboration-communities.component';

describe('CollaborationCommunitiesComponent', () => {
  let component: CollaborationCommunitiesComponent;
  let fixture: ComponentFixture<CollaborationCommunitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
