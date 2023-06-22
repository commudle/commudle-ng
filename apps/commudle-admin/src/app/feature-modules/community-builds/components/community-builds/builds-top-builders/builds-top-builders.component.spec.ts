import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildsTopBuildersComponent } from './builds-top-builders.component';

describe('BuildsTopBuildersComponent', () => {
  let component: BuildsTopBuildersComponent;
  let fixture: ComponentFixture<BuildsTopBuildersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildsTopBuildersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildsTopBuildersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
