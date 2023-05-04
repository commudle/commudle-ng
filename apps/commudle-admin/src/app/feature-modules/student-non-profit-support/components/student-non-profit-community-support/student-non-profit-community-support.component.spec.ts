import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNonProfitCommunitySupportComponent } from './student-non-profit-community-support.component';

describe('StudentNonProfitCommunitySupportComponent', () => {
  let component: StudentNonProfitCommunitySupportComponent;
  let fixture: ComponentFixture<StudentNonProfitCommunitySupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentNonProfitCommunitySupportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentNonProfitCommunitySupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
