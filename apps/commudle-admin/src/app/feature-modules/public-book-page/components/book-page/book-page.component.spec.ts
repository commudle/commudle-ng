import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPageComponent } from './book-page.component';

describe('BookPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
