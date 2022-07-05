import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PushNotificationComponent } from './push-notification.component';

describe('PushNotificationComponent', () => {
  let component: PushNotificationComponent;
  let fixture: ComponentFixture<PushNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PushNotificationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
