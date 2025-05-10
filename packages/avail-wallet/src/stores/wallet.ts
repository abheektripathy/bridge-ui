import { create } from 'zustand';
import { WalletAccount } from "@talismn/connect-wallets";

interface WalletStore {
  account: WalletAccount | null;
  setAccount: (account: WalletAccount | null) => void;
  connecting: boolean;
  setConnecting: (connecting: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
  connecting: false,
  setConnecting: (connecting) => set({ connecting }),
  error: null,
  setError: (error) => set({ error }),
}));