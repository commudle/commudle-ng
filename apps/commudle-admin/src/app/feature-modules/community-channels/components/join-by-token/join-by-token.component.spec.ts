import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinByTokenComponent } from './join-by-token.component';

describe('JoinByTokenComponent', () => {
  let component: JoinByTokenComponent;
  let fixture: ComponentFixture<JoinByTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinByTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinByTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
