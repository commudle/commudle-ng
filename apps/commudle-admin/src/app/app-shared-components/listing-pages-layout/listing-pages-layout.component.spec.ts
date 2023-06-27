import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPagesLayoutComponent } from './listing-pages-layout.component';

describe('ListingPagesLayoutComponent', () => {
  let component: ListingPagesLayoutComponent;
  let fixture: ComponentFixture<ListingPagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingPagesLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingPagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
