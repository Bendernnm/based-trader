import config from '../../config';
import { BinanceAPI } from './api';
import { BinanceAccountInfo, BinanceBalance } from './interfaces';

export class BinanceService {
  private readonly binanceAPI: BinanceAPI;

  constructor() {
    this.binanceAPI = new BinanceAPI(config.BINANCE_API_KEY, config.BINANCE_SECRET_KEY);
  }

  async getBalance(): Promise<BinanceBalance[]> {
    const accountInfo: BinanceAccountInfo = await this.binanceAPI.getAccount();

    return accountInfo.balances;
  }
}
