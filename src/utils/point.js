import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import {MSEC_IN_HOUR, MSEC_IN_DAY} from '../const.js';
dayjs.extend(duration);

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getTimeDifference(start, end) {
  const diff = dayjs(end).diff(dayjs(start));

  if (diff >= MSEC_IN_DAY) {
    return dayjs.duration(diff).format('DD[D] HH[H] mm[M]');
  }

  if (diff >= MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('HH[H] mm[M]');
  }

  if (diff < MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('mm[M]');
  }
}

function isFuturePoint(dueDate) {
  const now = dayjs();
  const pointDate = dayjs(dueDate);
  return pointDate.diff(now) > 0;
}

function isPresentPoint(dueDate) {
  const now = dayjs();
  const pointDate = dayjs(dueDate);
  return pointDate.diff(now) <= 0;
}

function isPastPoint(dueDate) {
  const now = dayjs();
  const pointDate = dayjs(dueDate);
  return pointDate.diff(now) < 0;
}

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {humanizeTaskDueDate, getTimeDifference, isFuturePoint, isPresentPoint, isPastPoint, updateItem};
