/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import { Chain } from "@/types/common"

type ChainLabelProps = {
    chain: Chain
}

function ChainLabel({ chain }: ChainLabelProps) {
    switch (chain) {
        case Chain.ETH:
            return (
                <div className="flex flex-row items-center justify-center space-x-1">
                    <img
                        src="/images/ETHEREUMsmall.png"
                        alt="eth"
                        className="w-4 h-4"
                    />
                    <p className="hidden md:flex text-opacity-70 text-white text-sm">Ethereum</p>
                </div>
            )
        case Chain.BASE:
            return (
                <div className="flex flex-row items-center justify-center space-x-1">
                    <img
                        src="/images/BASEsmall.png"
                        alt="base"
                        className="w-4 h-4"
                    />
                    <p className="hidden md:flex text-opacity-70 text-white text-sm">Base</p>
                </div>
            )
        case Chain.AVAIL:
            return (
                <div className="flex flex-row items-center justify-center space-x-1">
                    <img
                        src="/images/AVAILsmall.png"
                        alt="avail"
                        className="w-4 h-4"
                    />
                    <p className="hidden md:flex text-opacity-70 text-white text-sm">Avail</p>
                </div>
            )
        default:
            return null
    }
}

export { ChainLabel }