import { useCallback, useEffect, useState } from 'react';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import { Snap } from '../types';

const defaultSnapOrigin = 'npm:@avail-project/avail-snap';

export function useMetaMask() {
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null);
  const [installedSnap, setInstalledSnap] = useState<Snap | null>(null);

  useEffect(() => {
    const detectProvider = async () => {
      const ethereum = window.ethereum;
      if (ethereum?.isMetaMask) {
        setProvider(ethereum);
        try {
          const snaps = await ethereum.request({ method: 'wallet_getSnaps' });
          setInstalledSnap(snaps[defaultSnapOrigin] ?? null);
        } catch (err) {
          console.error('Failed to get installed snaps:', err);
        }
      }
    };

    detectProvider();
  }, []);

  const connectSnap = useCallback(async () => {
    if (!provider) {
      throw new Error('MetaMask not installed');
    }

    await provider.request({
      method: 'wallet_requestSnaps',
      params: {
        [defaultSnapOrigin]: {}
      }
    });

    const snaps = await provider.request({ method: 'wallet_getSnaps' });
    setInstalledSnap(snaps[defaultSnapOrigin]);
  }, [provider]);

  return {
    provider,
    installedSnap,
    connectSnap
  };
}