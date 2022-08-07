import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserContributionsComponent } from './user-contributions.component';

describe('UserContributionsComponent', () => {
  let component: UserContributionsComponent;
  let fixture: ComponentFixture<UserContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserContributionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
