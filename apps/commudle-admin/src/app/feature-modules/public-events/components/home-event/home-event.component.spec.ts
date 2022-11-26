import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeEventComponent } from './home-event.component';

describe('HomeEventComponent', () => {
  let component: HomeEventComponent;
  let fixture: ComponentFixture<HomeEventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
