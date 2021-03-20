import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLabsComponent } from './home-labs.component';

describe('HomeLabsComponent', () => {
  let component: HomeLabsComponent;
  let fixture: ComponentFixture<HomeLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
