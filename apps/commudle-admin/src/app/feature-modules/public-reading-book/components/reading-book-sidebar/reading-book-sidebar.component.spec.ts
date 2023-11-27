import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingBookSidebarComponent } from './reading-book-sidebar.component';

describe('ReadingBookSidebarComponent', () => {
  let component: ReadingBookSidebarComponent;
  let fixture: ComponentFixture<ReadingBookSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingBookSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingBookSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
