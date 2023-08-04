import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeaturedItemComponent } from './create-featured-item.component';

describe('CreateFeaturedItemComponent', () => {
  let component: CreateFeaturedItemComponent;
  let fixture: ComponentFixture<CreateFeaturedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFeaturedItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFeaturedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
