import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersListComponent } from './employers-list.component';

describe('EmployersListComponent', () => {
  let component: EmployersListComponent;
  let fixture: ComponentFixture<EmployersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployersListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
