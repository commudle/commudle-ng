import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollResultComponent } from './poll-result.component';

describe('PollResultComponent', () => {
  let component: PollResultComponent;
  let fixture: ComponentFixture<PollResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
