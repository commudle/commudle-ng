import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeBuildsCardComponent} from './home-builds-card.component';

describe('HomeBuildsCardComponent', () => {
  let component: HomeBuildsCardComponent;
  let fixture: ComponentFixture<HomeBuildsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBuildsCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuildsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
