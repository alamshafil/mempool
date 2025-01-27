import { query } from '../../utils/axios-query';
import priceUpdater, { PriceFeed, PriceHistory } from '../price-updater';

class GeminiApi implements PriceFeed {
  public name: string = 'Gemini';
  public currencies: string[] = ['USD'];

  public url: string = 'https://api.gemini.com/v1/pubticker/DOGE';
  public urlHist: string = 'https://api.gemini.com/v2/candles/DOGE{CURRENCY}/{GRANULARITY}';

  constructor() {
  }

  public async $fetchPrice(currency): Promise<number> {
    const response = await query(this.url + currency);
    if (response && response['last']) {
      return parseFloat(response['last']);
    } else {
      return -1;
    }
  }

  public async $fetchRecentPrice(currencies: string[], type: 'hour' | 'day'): Promise<PriceHistory> {
    const priceHistory: PriceHistory = {};

    for (const currency of currencies) {
      if (this.currencies.includes(currency) === false) {
        continue;
      }

      const response = await query(this.urlHist.replace('{GRANULARITY}', type === 'hour' ? '1hr' : '1day').replace('{CURRENCY}', currency));
      const pricesRaw = response ? response : [];

      for (const price of pricesRaw as any[]) {
        const time = Math.round(price[0] / 1000);
        if (priceHistory[time] === undefined) {
          priceHistory[time] = priceUpdater.getEmptyPricesObj();
        }
        priceHistory[time][currency] = price[4];
      }
    }

    return priceHistory;
  }
}

export default GeminiApi;
