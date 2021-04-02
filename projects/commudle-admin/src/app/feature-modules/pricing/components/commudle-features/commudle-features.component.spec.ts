import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommudleFeaturesComponent } from './commudle-features.component';

describe('CommudleFeaturesComponent', () => {
  let component: CommudleFeaturesComponent;
  let fixture: ComponentFixture<CommudleFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommudleFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommudleFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
