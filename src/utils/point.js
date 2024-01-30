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

const isMinorChange = (pointA, pointB) => pointA.dateFrom !== pointB.dateFrom ||
pointA.basePrice !== pointB.basePrice ||
getTimeDifference(pointA.dateFrom, pointA.dateTo) !== getTimeDifference(pointB.dateFrom, pointB.dateTo);

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  humanizeTaskDueDate,
  getTimeDifference,
  isMinorChange,
  updateItem,
};
