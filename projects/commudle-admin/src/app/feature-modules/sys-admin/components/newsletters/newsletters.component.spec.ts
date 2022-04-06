import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewslettersComponent } from './newsletters.component';

describe('NewslettersComponent', () => {
  let component: NewslettersComponent;
  let fixture: ComponentFixture<NewslettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewslettersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
