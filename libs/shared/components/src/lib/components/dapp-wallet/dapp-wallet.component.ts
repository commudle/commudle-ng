import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, ToastrService } from '@commudle/shared-services';
import { DappWalletService } from '../../services/dapp-wallet.service';
import { MetamaskService } from '../../services/metamask.service';
import { IDappWallet } from '@commudle/shared-models';

@Component({
  selector: 'commudle-dapp-wallet',
  templateUrl: './dapp-wallet.component.html',
  styleUrls: ['./dapp-wallet.component.scss'],
})
export class DappWalletComponent implements OnInit {
  @Input() parent_id: number;
  @Input() parent_type: 'Event';

  createForm: FormGroup;

  wallet: IDappWallet;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private dappWalletService: DappWalletService,
    private metamaskService: MetamaskService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      address: ['', Validators.required],
      wallet_type: ['metamask'],
      parent_id: [this.parent_id],
      parent_type: [this.parent_type],
    });

    this.getWallets();
  }

  getWallets() {
    this.dappWalletService.getWallets(this.parent_id, this.parent_type).subscribe((res) => {
      if (res.length === 0) {
        return;
      }
      this.wallet = res[0];
    });
  }

  connectWallet() {
    this.metamaskService
      .connectWallet()
      .then((res) => {
        this.createForm.patchValue({ address: res[0] });
        if (this.createForm.invalid) {
          return;
        }
        this.dappWalletService.createWallet(this.createForm.value).subscribe((res) => {
          this.wallet = res;
          this.toastrService.successDialog('Wallet connected successfully');
        });
      })
      .catch((err) => {
        this.toastrService.warningDialog(err);
      });
  }

  copyAddress() {
    navigator.clipboard.writeText(this.wallet.address);
  }

  disconnectWallet() {
    this.dappWalletService.destroyWallet(this.wallet.id).subscribe(() => {
      this.metamaskService.disconnectWallet();
      this.wallet = null;
      this.createForm.reset();
      this.createForm.patchValue({ parent_id: this.parent_id, parent_type: this.parent_type });
      this.toastrService.successDialog('Wallet disconnected successfully');
    });
  }
}
