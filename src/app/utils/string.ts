export const convertNumberToPrice = (
  priceNumber: number,
  withoutVND = false,
) => {
  if (!priceNumber) return `0${!withoutVND ? ' ₫' : ''}`;
  try {
    const prevText = priceNumber.toString();
    let result = '';
    let count = 0;
    for (let i = prevText.length - 1; i >= 0; i--) {
      result = prevText[i] + result;
      ++count;
      if (count === 3 && i > 0) {
        if (prevText[i - 1] !== '-') {
          result = '.' + result;
          count = 0;
        }
      }
    }
    const rs_final = `${result}${!withoutVND ? ' ₫' : ''}`;
    return rs_final;
  } catch (error) {
    return '';
  }
};
