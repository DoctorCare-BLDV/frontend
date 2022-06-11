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

export const checkValidEmail = (input: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
};

export const validatePhone = (phoneText = '') => {
  let message = '';

  if (phoneText) {
    const plus84Phone =
      !!Number(phoneText) &&
      phoneText.length === 12 &&
      phoneText[0] === '+' &&
      phoneText[1] === '8' &&
      phoneText[2] === '4';
    const _84Phone =
      !!Number(phoneText) &&
      phoneText.length === 11 &&
      phoneText[0] === '8' &&
      phoneText[1] === '4';
    const phone9Number =
      !!Number(phoneText) && phoneText.length === 9 && phoneText[0] !== '0';
    const phone10Number =
      !!Number(phoneText) && phoneText.length === 10 && phoneText[0] === '0';
    if (!phone9Number && !phone10Number && !plus84Phone && !_84Phone) {
      message = 'Số điện thoại không hợp lệ';
      return {result: false, message};
    }
    return {result: true, message: ''};
  }
  message = 'Vui lòng nhập số điện thoại';
  return {result: false, message};
};
