import { EXCHANGE_RATE } from './data.js';

export function formatPrice(amountInUSD, currency) {
  if (currency === 'PKR') {
    const pkrAmount = Math.round(amountInUSD * EXCHANGE_RATE);
    return `Rs. ${pkrAmount.toLocaleString()}`;
  }
  return `$${amountInUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
