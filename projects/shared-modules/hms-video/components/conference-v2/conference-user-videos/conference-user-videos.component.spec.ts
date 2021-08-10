import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceUserVideosComponent } from './conference-user-videos.component';

describe('ConferenceUserVideosComponent', () => {
  let component: ConferenceUserVideosComponent;
  let fixture: ComponentFixture<ConferenceUserVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConferenceUserVideosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceUserVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
