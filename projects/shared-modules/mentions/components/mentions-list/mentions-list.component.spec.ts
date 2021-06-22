import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentionsListComponent } from './mentions-list.component';

describe('MentionsListComponent', () => {
  let component: MentionsListComponent;
  let fixture: ComponentFixture<MentionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentionsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
