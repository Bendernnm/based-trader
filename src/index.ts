import 'dotenv/config';
import config from './config';
import { sum } from './utils/sum';

console.log(config);
console.log('Hello, TypeScript!');
console.log('Sum of 1 and 2:', sum(1, 2)); 