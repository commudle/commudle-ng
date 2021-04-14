import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExternalFeedHListItemComponent } from './external-feed-hlist-item.component';

describe('ExternalFeedHListItemComponent', () => {
  let component: ExternalFeedHListItemComponent;
  let fixture: ComponentFixture<ExternalFeedHListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalFeedHListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalFeedHListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
