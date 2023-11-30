import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingBookIndexComponent } from './reading-book-index.component';

describe('ReadingBookIndexComponent', () => {
  let component: ReadingBookIndexComponent;
  let fixture: ComponentFixture<ReadingBookIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingBookIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingBookIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
