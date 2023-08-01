import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeaturedItemComponent } from './delete-featured-item.component';

describe('DeleteFeaturedItemComponent', () => {
  let component: DeleteFeaturedItemComponent;
  let fixture: ComponentFixture<DeleteFeaturedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFeaturedItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFeaturedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
