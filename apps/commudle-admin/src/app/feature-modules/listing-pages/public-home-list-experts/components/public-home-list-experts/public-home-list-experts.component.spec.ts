import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHomeListExpertsComponent } from './public-home-list-experts.component';

describe('PublicHomeListExpertsComponent', () => {
  let component: PublicHomeListExpertsComponent;
  let fixture: ComponentFixture<PublicHomeListExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicHomeListExpertsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicHomeListExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
