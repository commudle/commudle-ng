import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBuildsCardComponent } from './homepage-builds-card.component';

describe('HomepageBuildsCardComponent', () => {
  let component: HomepageBuildsCardComponent;
  let fixture: ComponentFixture<HomepageBuildsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageBuildsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageBuildsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
