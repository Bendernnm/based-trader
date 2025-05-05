import 'dotenv/config';
import { sum } from './utils/sum';
import { BinanceService } from './services/binance';

console.log('Hello, TypeScript!');
console.log('Sum of 1 and 2:', sum(1, 2));

(async () => {
  const binanceService = new BinanceService();

  const balance = await binanceService.getBalance();

  console.log(balance);
})();
