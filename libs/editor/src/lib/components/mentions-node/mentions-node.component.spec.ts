import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsNodeComponent } from './mentions-node.component';

describe('MentionsNodeComponent', () => {
  let component: MentionsNodeComponent;
  let fixture: ComponentFixture<MentionsNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentionsNodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MentionsNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
