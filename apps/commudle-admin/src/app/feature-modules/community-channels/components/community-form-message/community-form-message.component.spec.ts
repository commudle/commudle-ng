import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityFormMessageComponent } from './community-form-message.component';

describe('CommunityFormMessageComponent', () => {
  let component: CommunityFormMessageComponent;
  let fixture: ComponentFixture<CommunityFormMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityFormMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityFormMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
