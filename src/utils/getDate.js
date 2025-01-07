import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export const getDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
}