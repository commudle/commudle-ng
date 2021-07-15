import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunitiesPostsComponent } from './communities-posts.component';

describe('CommunitiesPostsComponent', () => {
  let component: CommunitiesPostsComponent;
  let fixture: ComponentFixture<CommunitiesPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitiesPostsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
