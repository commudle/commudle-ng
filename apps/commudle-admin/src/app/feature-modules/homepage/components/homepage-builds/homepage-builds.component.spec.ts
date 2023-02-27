import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBuildsComponent } from './homepage-builds.component';

describe('HomepageBuildsComponent', () => {
  let component: HomepageBuildsComponent;
  let fixture: ComponentFixture<HomepageBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageBuildsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
