import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommunitiesAboutComponent} from './communities-about.component';

describe('CommunitiesAboutComponent', () => {
  let component: CommunitiesAboutComponent;
  let fixture: ComponentFixture<CommunitiesAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitiesAboutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
