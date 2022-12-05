import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesFeaturedComponent } from './communities-featured.component';

describe('CommunitiesFeaturedComponent', () => {
  let component: CommunitiesFeaturedComponent;
  let fixture: ComponentFixture<CommunitiesFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunitiesFeaturedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
