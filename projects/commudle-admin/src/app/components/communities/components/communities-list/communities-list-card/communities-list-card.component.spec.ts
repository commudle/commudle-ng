import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommunitiesListCardComponent} from './communities-list-card.component';

describe('CommunitiesListCardComponent', () => {
  let component: CommunitiesListCardComponent;
  let fixture: ComponentFixture<CommunitiesListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitiesListCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
