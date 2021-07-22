import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunitiesPromotionsComponent } from './communities-promotions.component';

describe('CommunitiesPromotionsComponent', () => {
  let component: CommunitiesPromotionsComponent;
  let fixture: ComponentFixture<CommunitiesPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitiesPromotionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
