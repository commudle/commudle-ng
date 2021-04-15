import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeExpertsComponent} from './home-experts.component';

describe('HomeExpertsComponent', () => {
  let component: HomeExpertsComponent;
  let fixture: ComponentFixture<HomeExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeExpertsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
