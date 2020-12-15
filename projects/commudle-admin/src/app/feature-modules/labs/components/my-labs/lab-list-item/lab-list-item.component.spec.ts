import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabListItemComponent } from './lab-list-item.component';

describe('LabListItemComponent', () => {
  let component: LabListItemComponent;
  let fixture: ComponentFixture<LabListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
