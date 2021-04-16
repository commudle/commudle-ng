import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExternalFeedComponent } from './single-external-feed.component';

describe('SingleExtrnalFeedComponent', () => {
  let component: SingleExternalFeedComponent;
  let fixture: ComponentFixture<SingleExternalFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleExternalFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleExternalFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
