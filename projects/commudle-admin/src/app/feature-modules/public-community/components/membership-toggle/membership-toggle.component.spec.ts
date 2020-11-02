import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipToggleComponent } from './membership-toggle.component';

describe('MembershipToggleComponent', () => {
  let component: MembershipToggleComponent;
  let fixture: ComponentFixture<MembershipToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
