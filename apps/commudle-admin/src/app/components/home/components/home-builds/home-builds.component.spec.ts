import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeBuildsComponent} from './home-builds.component';

describe('HomeBuildsComponent', () => {
  let component: HomeBuildsComponent;
  let fixture: ComponentFixture<HomeBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBuildsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
