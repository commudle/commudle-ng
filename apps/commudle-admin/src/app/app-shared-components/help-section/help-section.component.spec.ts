import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSectionComponent } from './help-section.component';

describe('HelpSectionComponent', () => {
  let component: HelpSectionComponent;
  let fixture: ComponentFixture<HelpSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
