import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLabsComponent } from './homepage-labs.component';

describe('HomepageLabsComponent', () => {
  let component: HomepageLabsComponent;
  let fixture: ComponentFixture<HomepageLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
