import { useCallback } from 'react';
import { InvokeSnapParams } from '../types';
import { useMetaMask } from './useMetaMask';

const defaultSnapOrigin = 'npm:@avail-project/avail-snap';

export function useInvokeSnap() {
  const { provider } = useMetaMask();

  return useCallback(async ({ method, params }: InvokeSnapParams) => {
    if (!provider) {
      throw new Error('MetaMask not installed');
    }

    return provider.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: defaultSnapOrigin,
        request: params ? { method, params } : { method },
      },
    });
  }, [provider]);
}