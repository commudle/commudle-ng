import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSigninComponent } from './first-signin.component';

describe('FirstSigninComponent', () => {
  let component: FirstSigninComponent;
  let fixture: ComponentFixture<FirstSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstSigninComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
