import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPageComponent } from './community-page.component';

describe('CommunityPageComponent', () => {
  let component: CommunityPageComponent;
  let fixture: ComponentFixture<CommunityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
