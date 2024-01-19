import {FilterTypes} from '../const.js';
import {isFuturePoint, isPresentPoint, isPastPoint} from './point.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterTypes.PRESENT]: (points) => points.filter(isPresentPoint),
  [FilterTypes.PAST]: (points) => points.filter(isPastPoint),
};

export {filter};
