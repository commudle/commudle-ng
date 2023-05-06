import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscussionComponent } from './discussion.component';

describe('DiscussionComponent', () => {
  let component: DiscussionComponent;
  let fixture: ComponentFixture<DiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscussionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
