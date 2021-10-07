import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBadgesListComponent } from './admin-badges-list.component';

describe('AdminBadgesListComponent', () => {
  let component: AdminBadgesListComponent;
  let fixture: ComponentFixture<AdminBadgesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBadgesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBadgesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
