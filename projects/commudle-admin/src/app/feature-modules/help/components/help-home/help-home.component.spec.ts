import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpHomeComponent } from './help-home.component';

describe('HelpHomeComponent', () => {
  let component: HelpHomeComponent;
  let fixture: ComponentFixture<HelpHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
