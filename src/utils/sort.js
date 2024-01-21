import dayjs from 'dayjs';
import {SortTypes} from '../const.js';

const getPointsByDate = (pointA, pointB) => dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));

const getPointsByTime = (pointA, pointB) => {
  const eventADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const eventBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return eventBDuration - eventADuration;
};

const getPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sorting = {
  [SortTypes.DAY]: (points) => points.sort(getPointsByDate),
  [SortTypes.EVENT]: () => {
    throw new Error(`Sort by ${SortTypes.EVENT} is diabled.`);
  },
  [SortTypes.TIME]: (points) => points.toSorted(getPointsByTime),
  [SortTypes.PRICE]: (points) => points.sort(getPointsByPrice),
  [SortTypes.OFFERS]: () => {
    throw new Error(`Sort by ${SortTypes.OFFERS} is diabled.`);
  }
};

export {sorting, getPointsByTime, getPointsByPrice};
