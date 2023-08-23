import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPaymentsComponent } from './community-payments.component';

describe('CommunityPaymentsComponent', () => {
  let component: CommunityPaymentsComponent;
  let fixture: ComponentFixture<CommunityPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityPaymentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
