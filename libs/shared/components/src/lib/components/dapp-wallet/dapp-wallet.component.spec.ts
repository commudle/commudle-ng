import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DappWalletComponent } from './dapp-wallet.component';

describe('DappWalletComponent', () => {
  let component: DappWalletComponent;
  let fixture: ComponentFixture<DappWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DappWalletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DappWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
