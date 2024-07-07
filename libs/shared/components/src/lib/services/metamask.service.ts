import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetamaskService {
  private ethereum: any;

  constructor() {
    const { ethereum } = <never>window;
    this.ethereum = ethereum;
  }

  public async connectWallet(): Promise<any> {
    if (!this.ethereum) {
      return Promise.reject('Please install MetaMask!');
    }

    try {
      return await this.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error.
        // If this happens, the user rejected the connection request.
        return Promise.reject('User rejected connection request. Please try again.');
      } else {
        return Promise.reject(err);
      }
    }
  }

  // revoke access to the dapp
  public async disconnectWallet(): Promise<void> {
    if (!this.ethereum) {
      return Promise.reject('Please install MetaMask!');
    }

    return await this.ethereum.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] });
  }
}
