import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsHeaderComponent } from './builds-header.component';

describe('BuildsHeaderComponent', () => {
  let component: BuildsHeaderComponent;
  let fixture: ComponentFixture<BuildsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildsHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
