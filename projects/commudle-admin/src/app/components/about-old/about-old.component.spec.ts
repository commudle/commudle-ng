import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOldComponent } from './about-old.component';

describe('AboutOldComponent', () => {
  let component: AboutOldComponent;
  let fixture: ComponentFixture<AboutOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutOldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
