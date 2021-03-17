import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LabDiscussionComponent} from './lab-discussion.component';

describe('LabDiscussionComponent', () => {
  let component: LabDiscussionComponent;
  let fixture: ComponentFixture<LabDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabDiscussionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
