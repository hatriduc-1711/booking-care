import dayjs from 'dayjs';

const checkDate = (date: string): boolean => {
  const dateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
  const isFormat = date.match(dateRegex);
  if (!isFormat) return false;
  const isAfter = dayjs().isAfter(date, 'day');
  if (isAfter) return false;
  return true;
};

export default checkDate;
