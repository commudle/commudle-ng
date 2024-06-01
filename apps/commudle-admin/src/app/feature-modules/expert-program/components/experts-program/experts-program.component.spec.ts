import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsProgramComponent } from './experts-program.component';

describe('ExpertsProgramComponent', () => {
  let component: ExpertsProgramComponent;
  let fixture: ComponentFixture<ExpertsProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpertsProgramComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpertsProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
