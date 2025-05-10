import { WalletAccount } from "@talismn/connect-wallets";

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type GetSnapsResponse = Record<string, Snap>;

export interface WalletContextState {
  account: WalletAccount | null;
  connecting: boolean;
  connected: boolean;
  error: Error | null;
}

export type InvokeSnapParams = {
  method: string;
  params?: Record<string, unknown>;
};

export type TxPayload = {
  payload: {
    specVersion: string;
    transactionVersion: string;
    address: string;
    blockHash: string;
    blockNumber: string;
    era: string;
    genesisHash: string;
    method: string;
    nonce: string;
    signedExtensions: string[];
    tip: string;
    version: number;
  };
};

export type MetamaskTransaction = {
  hash: string;
};