import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExtrnalFeedComponent } from './single-external-feed.component';

describe('SingleExtrnalFeedComponent', () => {
  let component: SingleExtrnalFeedComponent;
  let fixture: ComponentFixture<SingleExtrnalFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExtrnalFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExtrnalFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
