import { NetworkType } from "symbol-sdk/dist/src/model/network";

export interface Network {
  type: NetworkType;
  generationHash: string;
  epochAdjustment: number;
  currencyMosaicId: string;
  networkCurrencyDivisibility: number;
}

export interface NodeInfo {
  url: string;
}
