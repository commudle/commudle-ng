import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDashboardComponent } from './homepage-dashboard.component';

describe('HomepageDashboardComponent', () => {
  let component: HomepageDashboardComponent;
  let fixture: ComponentFixture<HomepageDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
