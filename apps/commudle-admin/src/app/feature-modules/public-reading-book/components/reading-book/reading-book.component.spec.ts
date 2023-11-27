import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingBookComponent } from './reading-book.component';

describe('ReadingBookComponent', () => {
  let component: ReadingBookComponent;
  let fixture: ComponentFixture<ReadingBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingBookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
