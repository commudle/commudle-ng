import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsDisplayComponent } from './flags-display.component';

describe('FlagsDisplayComponent', () => {
  let component: FlagsDisplayComponent;
  let fixture: ComponentFixture<FlagsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
