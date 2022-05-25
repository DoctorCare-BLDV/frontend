export const numberFormat = (
  target: number = 0,
  n: number = 0,
  x: number = 0,
) => {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\,' : '$') + ')';
  return target.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
};

export const vndCurrencyFormat = (
  target: number = 0,
  n: number = 0,
  x: number = 0,
) => {
  return numberFormat(target, n, x) + 'đ';
};

export const pointFormat = (
  target: number = 0,
  n: number = 0,
  x: number = 0,
) => {
  return numberFormat(target, n, x) + ' MV';
};
