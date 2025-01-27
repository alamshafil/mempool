import logger from '../../logger';
import PricesRepository from '../../repositories/PricesRepository';
import { query } from '../../utils/axios-query';
import priceUpdater, { PriceFeed, PriceHistory } from '../price-updater';

class KrakenApi implements PriceFeed {
  public name: string = 'Kraken';
  public currencies: string[] = ['USD', 'EUR'];

  public url: string = 'https://api.kraken.com/0/public/Ticker?pair=DOGE';
  public urlHist: string = 'https://api.kraken.com/0/public/OHLC?interval={GRANULARITY}&pair=DOGE';

  constructor() {
  }

  private getTicker(currency) {
    let ticker = `XDG${currency}`;
    if (['CHF', 'AUD'].includes(currency)) {
      ticker = `DOGE${currency}`;
    }
    return ticker;
  }

  public async $fetchPrice(currency): Promise<number> {
    const response = await query(this.url + currency);
    const ticker = this.getTicker(currency);
    if (response && response['result'] && response['result'][ticker] &&
      response['result'][ticker]['c'] && response['result'][ticker]['c'].length > 0
    ) {
      return parseFloat(response['result'][ticker]['c'][0]);
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

      const response = await query(this.urlHist.replace('{GRANULARITY}', '60') + currency);
      const pricesRaw = response ? response['result'][this.getTicker(currency)] : [];

      for (const price of pricesRaw) {
        if (priceHistory[price[0]] === undefined) {
          priceHistory[price[0]] = priceUpdater.getEmptyPricesObj();
        }
        priceHistory[price[0]][currency] = price[4];
      }
    }

    return priceHistory;
  }

  /**
   * Fetch weekly price and save it into the database
   */
  public async $insertHistoricalPrice(): Promise<void> {
    const existingPriceTimes = await PricesRepository.$getPricesTimes();

    // EUR weekly price history goes back to timestamp 1576713600 (December 19, 2019)
    // USD weekly price history goes back to timestamp 1576713600 (December 19, 2019)

    let priceHistory: any = {}; // map: timestamp -> Prices

    for (const currency of this.currencies) {
      const response = await query(this.urlHist.replace('{GRANULARITY}', '10080') + currency);
      const priceHistoryRaw = response ? response['result'][this.getTicker(currency)] : [];

      for (const price of priceHistoryRaw) {
        if (existingPriceTimes.includes(parseInt(price[0]))) {
          continue;
        }

        // prices[0] = kraken price timestamp
        // prices[4] = closing price
        if (priceHistory[price[0]] === undefined) {
          priceHistory[price[0]] = priceUpdater.getEmptyPricesObj();
        }
        priceHistory[price[0]][currency] = price[4];
      }
    }

    for (const time in priceHistory) {
      if (priceHistory[time].USD === -1) {
        delete priceHistory[time];
        continue;
      }
      await PricesRepository.$savePrices(parseInt(time, 10), priceHistory[time]);
    }

    if (Object.keys(priceHistory).length > 0) {
      logger.info(`Inserted ${Object.keys(priceHistory).length} Kraken EUR and USD weekly price history into db`, logger.tags.mining);
    }
  }
}

export default KrakenApi;
