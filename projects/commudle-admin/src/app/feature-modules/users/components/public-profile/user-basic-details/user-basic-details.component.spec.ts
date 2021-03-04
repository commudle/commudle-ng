import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasicDetailsComponent } from './user-basic-details.component';

describe('UserBasicDetailsComponent', () => {
  let component: UserBasicDetailsComponent;
  let fixture: ComponentFixture<UserBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
