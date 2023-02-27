import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeCommunitiesComponent} from './home-communities.component';

describe('HomeCommunitiesComponent', () => {
  let component: HomeCommunitiesComponent;
  let fixture: ComponentFixture<HomeCommunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCommunitiesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
