import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollaboratingCommunitiesComponent } from './collaborating-communities.component';

describe('CollaboratingCommunitiesComponent', () => {
  let component: CollaboratingCommunitiesComponent;
  let fixture: ComponentFixture<CollaboratingCommunitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratingCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratingCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
