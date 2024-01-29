import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {FilterTypes} from '../const.js';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function isFuturePoint(point) {
  return dayjs().isBefore(dayjs(point.dateFrom));
}

function isPresentPoint(point) {
  return dayjs().isSameOrAfter(dayjs(point.dateFrom)) && dayjs().isSameOrBefore(dayjs(point.dateTo));
}

function isPastPoint(point) {
  return dayjs().isAfter(dayjs(point.dateTo));
}

const filter = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterTypes.PRESENT]: (points) => points.filter(isPresentPoint),
  [FilterTypes.PAST]: (points) => points.filter(isPastPoint),
};

export {filter};
