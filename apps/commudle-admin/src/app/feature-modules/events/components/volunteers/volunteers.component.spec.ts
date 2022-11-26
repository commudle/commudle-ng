import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VolunteersComponent } from './volunteers.component';

describe('VolunteersComponent', () => {
  let component: VolunteersComponent;
  let fixture: ComponentFixture<VolunteersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
