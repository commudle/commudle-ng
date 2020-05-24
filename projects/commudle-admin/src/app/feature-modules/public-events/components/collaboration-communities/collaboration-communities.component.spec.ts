import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationCommunitiesComponent } from './collaboration-communities.component';

describe('CollaborationCommunitiesComponent', () => {
  let component: CollaborationCommunitiesComponent;
  let fixture: ComponentFixture<CollaborationCommunitiesComponent>;

  beforeEach(async(() => {
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
