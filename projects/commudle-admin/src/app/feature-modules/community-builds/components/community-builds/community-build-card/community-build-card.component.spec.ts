import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBuildCardComponent } from './community-build-card.component';

describe('CommunityBuildCardComponent', () => {
  let component: CommunityBuildCardComponent;
  let fixture: ComponentFixture<CommunityBuildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityBuildCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBuildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
