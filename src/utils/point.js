import dayjs from 'dayjs';
import {SEC_IN_MINUTES, HOUR_IN_A_DAY} from '../const.js';

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getTimeDifference(start, end) {
  const durationInMinutes = dayjs(end).diff(start, 'minute');

  const days = Math.floor(durationInMinutes / (HOUR_IN_A_DAY * SEC_IN_MINUTES));
  const hours = Math.floor((durationInMinutes % (HOUR_IN_A_DAY * SEC_IN_MINUTES)) / SEC_IN_MINUTES);
  const minutes = durationInMinutes % SEC_IN_MINUTES;

  let durationString = '';

  if (days > 0) {
    durationString += `${days}D `;
  }

  if (hours > 0) {
    durationString += `${hours}H `;
  }

  if (minutes > 0 || (days === 0 && hours === 0)) {
    durationString += `${minutes}M `;
  }

  return durationString;
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

export {humanizeTaskDueDate, getTimeDifference, isFuturePoint, isPresentPoint, isPastPoint};
