import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectRoleV2Component } from './select-role-v2.component';

describe('SelectRoleV2Component', () => {
  let component: SelectRoleV2Component;
  let fixture: ComponentFixture<SelectRoleV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRoleV2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
