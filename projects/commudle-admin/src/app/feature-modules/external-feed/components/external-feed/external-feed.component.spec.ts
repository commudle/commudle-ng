import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFeedComponent } from './external-feed.component';

describe('ExternalFeedComponent', () => {
  let component: ExternalFeedComponent;
  let fixture: ComponentFixture<ExternalFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
