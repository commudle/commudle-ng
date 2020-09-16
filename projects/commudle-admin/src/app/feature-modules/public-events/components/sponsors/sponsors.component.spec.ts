import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsComponent } from './sponsors.component';

describe('SponsorsComponent', () => {
  let component: SponsorsComponent;
  let fixture: ComponentFixture<SponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
