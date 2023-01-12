import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LabDiscussionMessageComponent} from './lab-discussion-message.component';

describe('LabDiscussionMessageComponent', () => {
  let component: LabDiscussionMessageComponent;
  let fixture: ComponentFixture<LabDiscussionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabDiscussionMessageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDiscussionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
