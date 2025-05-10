import { useCallback } from 'react';
import { WalletAccount, getWallets } from "@talismn/connect-wallets";
import { useWalletStore } from '../stores/wallet';

export function useAvailWallet() {
  const { account, setAccount, connecting, setConnecting, error, setError } = useWalletStore();

  const connect = useCallback(async (walletName: string) => {
    try {
      setConnecting(true);
      const wallets = getWallets();
      const wallet = wallets.find(w => w.title === walletName);
      
      if (!wallet) {
        throw new Error(`Wallet ${walletName} not found`);
      }

      await wallet.enable('avail-wallet');
      const accounts = await wallet.getAccounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      setAccount(accounts[0]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to connect'));
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setError(null);
  }, []);

  const signMessage = useCallback(async (message: string): Promise<string> => {
    if (!account?.wallet?.signer) {
      throw new Error('No signer available');
    }

    const { signature } = await account.wallet.signer.signRaw({
      type: 'bytes',
      data: message,
      address: account.address
    });

    return signature;
  }, [account]);

  const signPayloadJSON = useCallback(async (payload: any): Promise<string> => {
    if (!account?.wallet?.signer) {
      throw new Error('No signer available');
    }

    const { signature } = await account.wallet.signer.signPayload(payload);
    return signature;
  }, [account]);

  return {
    account,
    connecting,
    error,
    connect,
    disconnect,
    signMessage,
    signPayloadJSON
  };
}