import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {MSEC_IN_HOUR, MSEC_IN_DAY} from '../const.js';
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

function isFuturePoint(point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPresentPoint(point) {
  return dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo));
}

function isPastPoint(point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  humanizeTaskDueDate,
  getTimeDifference,
  isFuturePoint,
  isPresentPoint,
  isPastPoint,
  updateItem,
};
