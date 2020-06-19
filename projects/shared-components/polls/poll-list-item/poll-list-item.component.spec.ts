import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollListItemComponent } from './poll-list-item.component';

describe('PollListItemComponent', () => {
  let component: PollListItemComponent;
  let fixture: ComponentFixture<PollListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
