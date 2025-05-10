"use client";

import React, { useState } from 'react';
import { useAvailWallet } from '@avail-wallet/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, InfoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { IoMdClose } from 'react-icons/io';
import { Wallet } from 'lucide-react';
import { getWallets } from "@talismn/connect-wallets";

export default function AvailWalletConnect() {
  const [open, setOpen] = useState(false);
  const { account, connecting, error, connect, disconnect } = useAvailWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const supportedWallets = getWallets();

  if (account) {
    return (
      <div className={Badge({ variant: "avail" })} onClick={() => disconnect()}>
        <Wallet className='pr-1 h-5 w-5'/>
        {account.address.slice(0, 6) + "..." + account.address.slice(-4)}
        <button className="ml-2">
          <IoMdClose />
        </button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm" className="!ml-2">
          Connect Wallet
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-[#252831] border-2 border-[#3a3b3cb1] rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-thicccboibold text-3xl text-white">
            Connect Wallet
          </DialogTitle>
          
          <DialogDescription className="font-thicccboiregular text-md text-white text-opacity-70 pt-2">
            <div className="flex flex-row font-ppmori items-start justify-start pt-3 space-x-2">
              <InfoIcon />
              <span>
                Don&apos;t have an Avail Wallet yet? Checkout this{" "}
                <a
                  href="https://docs.availspace.app/avail-space/web-dashboard-user-guide/getting-started/how-to-install-subwallet-and-create-a-new-avail-account?utm_source=avail&utm_medium=docspace&utm_campaign=avlclaim"
                  className="underline"
                  target="_blank"
                >
                  cool tutorial
                </a>{" "}
                by Subwallet.
              </span>
            </div>
          </DialogDescription>

          <div className="flex flex-col gap-3 max-h-72 overflow-y-scroll mt-4">
            {supportedWallets.map((wallet) => (
              <Button
                key={wallet.title}
                variant="default"
                disabled={!wallet.installed}
                className="!text-lg font-thin bg-[#3a3b3cb1] text-left font-ppmori rounded-xl !p-8"
                onClick={() => {
                  setSelectedWallet(wallet.title);
                  connect(wallet.title);
                }}
              >
                <div className="flex flex-row">
                  <img
                    alt={wallet.title}
                    height={20}
                    width={20}
                    src={wallet.logo.src}
                    className="mr-4"
                  />
                  {wallet.title}
                </div>
              </Button>
            ))}
          </div>
        </DialogHeader>

        <DialogFooter className="flex w-full mt-2 text-white text-opacity-70 font-ppmori font-light !flex-col !items-center !justify-center">
          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}
          {connecting && (
            <p>Connecting...</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}