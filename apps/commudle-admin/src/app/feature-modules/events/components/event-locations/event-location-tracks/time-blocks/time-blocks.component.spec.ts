import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBlocksComponent } from './time-blocks.component';

describe('TimeBlocksComponent', () => {
  let component: TimeBlocksComponent;
  let fixture: ComponentFixture<TimeBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeBlocksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
