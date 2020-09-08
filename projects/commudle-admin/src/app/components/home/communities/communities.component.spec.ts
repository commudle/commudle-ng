import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesComponent } from './communities.component';

describe('CommunitiesComponent', () => {
  let component: CommunitiesComponent;
  let fixture: ComponentFixture<CommunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
