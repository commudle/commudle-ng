import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniUserProfileComponent } from './mini-user-profile.component';

describe('MiniUserProfileComponent', () => {
  let component: MiniUserProfileComponent;
  let fixture: ComponentFixture<MiniUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniUserProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
