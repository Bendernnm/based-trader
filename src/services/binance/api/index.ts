import crypto from 'crypto';
import { generateUrl } from '../../../utils';
import { BinanceAccountInfo } from '../interfaces';
import { fetchRequest, FetchResponseType } from '../../../helpers/request';

export class BinanceAPI {
  private readonly endpoints: Map<string, string>;
  private readonly binanceBaseUrl = 'https://api.binance.com';

  constructor(
    private readonly binanceApiKey: string,
    private readonly binanceSecretKey: string,
  ) {
    this.endpoints = new Map([['accountInfo', '/api/v3/account']]);
  }

  private calculateSignature(query: string): string {
    return crypto.createHmac('sha256', this.binanceSecretKey).update(query).digest('hex');
  }

  async getAccount(): Promise<BinanceAccountInfo> {
    const timestamp: string = Date.now().toString();
    const query = new URLSearchParams({ timestamp, omitZeroBalances: 'true' });
    const signature: string = this.calculateSignature(query.toString());

    query.append('signature', signature);

    const url: string = generateUrl(
      this.binanceBaseUrl,
      this.endpoints.get('accountInfo') || '',
      query.toString(),
    );

    const data: FetchResponseType<BinanceAccountInfo> = await fetchRequest.get<BinanceAccountInfo>(
      url,
      {
        headers: { 'X-MBX-APIKEY': this.binanceApiKey },
      },
    );

    return data.body;
  }
}
