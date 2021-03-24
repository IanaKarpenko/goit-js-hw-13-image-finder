import * as PNotify from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const enterImageName = function enterImgName() {
  PNotify.error({
    text: 'Вы не ввели ключевое слово для поиска картинок',
    delay: 3000,
  });
};

export default { enterImageName };