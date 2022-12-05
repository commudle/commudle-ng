import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesDisplayComponent } from './votes-display.component';

describe('VotesDisplayComponent', () => {
  let component: VotesDisplayComponent;
  let fixture: ComponentFixture<VotesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
