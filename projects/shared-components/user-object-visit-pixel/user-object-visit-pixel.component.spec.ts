import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserObjectVisitPixelComponent } from './user-object-visit-pixel.component';

describe('UserObjectVisitPixelComponent', () => {
  let component: UserObjectVisitPixelComponent;
  let fixture: ComponentFixture<UserObjectVisitPixelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserObjectVisitPixelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserObjectVisitPixelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
