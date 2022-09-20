import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserNetworkListComponent} from './user-network-list.component';

describe('UserNetworkListComponent', () => {
  let component: UserNetworkListComponent;
  let fixture: ComponentFixture<UserNetworkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNetworkListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNetworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
