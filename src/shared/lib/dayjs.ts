import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

// Подключаем плагины
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

// Устанавливаем локаль
dayjs.locale('ru');

export { dayjs };