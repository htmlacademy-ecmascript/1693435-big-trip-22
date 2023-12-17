import dayjs from 'dayjs';
import {SEC_IN_MINUTES, HOUR_IN_A_DAY} from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(maxRandomvalue) {
  return Math.floor(Math.random() * maxRandomvalue);
}

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getTimeDifference(start, end) {
  const difference = dayjs(end).diff(start) / SEC_IN_MINUTES;

  if (difference < SEC_IN_MINUTES) {
    return dayjs(difference).format('mm[M]');
  } else if (difference > SEC_IN_MINUTES && difference < SEC_IN_MINUTES * HOUR_IN_A_DAY) {
    return dayjs(difference).format('HH[H] mm[M]');
  } else {
    return dayjs(difference).format('DD[D] HH[H] mm[M]');
  }
}

export {getRandomArrayElement, getRandomInteger, humanizeTaskDueDate, getTimeDifference};
