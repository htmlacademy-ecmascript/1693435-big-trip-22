import {FilterType} from '../const.js';
import {isFuturePoint, isPresentPoint, isPastPoint} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterType.PRESENT]: (points) => points.filter(isPresentPoint),
  [FilterType.PAST]: (points) => points.filter(isPastPoint),
};

export {filter};
