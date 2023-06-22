import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBuildersCardComponent } from './top-builders-card.component';

describe('TopBuildersCardComponent', () => {
  let component: TopBuildersCardComponent;
  let fixture: ComponentFixture<TopBuildersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBuildersCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBuildersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
