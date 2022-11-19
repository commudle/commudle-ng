import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringLookingWorksTagsComponent } from './hiring-looking-works-tags.component';

describe('HiringLookingWorksTagsComponent', () => {
  let component: HiringLookingWorksTagsComponent;
  let fixture: ComponentFixture<HiringLookingWorksTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiringLookingWorksTagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringLookingWorksTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
