import {MessageOptions, showMessage} from 'react-native-flash-message';
import {Colors} from '@app/resources';

const flashMessageSuccessTheme = {
  color: Colors.WHITE,
  backgroundColor: Colors.SUCCESS,
};
const flashMessageDangerTheme = {
  color: Colors.WHITE,
  backgroundColor: Colors.DANGER,
};
const flashMessageInfoTheme = {
  color: Colors.WHITE,
  backgroundColor: Colors.INFO,
};
const flashMessageWarningTheme = {
  color: Colors.WHITE,
  backgroundColor: Colors.WARNING,
};

export const showFlashMessage = (props: MessageOptions) => {
  let theme = {};

  switch (props.type) {
    case 'danger':
      theme = flashMessageDangerTheme;
      break;
    case 'success':
      theme = flashMessageSuccessTheme;
      break;
    case 'info':
      theme = flashMessageInfoTheme;
      break;
    case 'warning':
      theme = flashMessageWarningTheme;
      break;
    default:
      break;
  }
  showMessage({...props, ...theme});
};
