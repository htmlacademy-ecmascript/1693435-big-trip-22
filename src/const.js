const SEC_IN_MINUTES = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_A_DAY = 24;
const MSEC_IN_SEC = 1000;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MINUTES * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_A_DAY;
const PICTURE_URL = 'https://loremflickr.com/248/152?random=';

const DateFormat = {
  hours: 'HH:mm',
  month: 'MMM D',
  date: 'YYYY-MM-DD',
  dateWithTime: 'YY/MM/DD HH:mm'
};

const pointTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DESCRIPTIONS = [
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const EnabledSortType = {
  [SortTypes.DAY]: true,
  [SortTypes.EVENT]: false,
  [SortTypes.TIME]: true,
  [SortTypes.PRICE]: true,
  [SortTypes.OFFERS]: false,
};

function getDefaultPoint() {
  return ({
    basePrice: 0,
    dateFrom: '',
    dateTo: '',
    destination: 0,
    isFavorite: false,
    offers: [],
    type: pointTypes[5],
  });
}

function сapitalizeTheFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  SEC_IN_MINUTES,
  HOUR_IN_A_DAY,
  MSEC_IN_HOUR,
  MSEC_IN_DAY,
  PICTURE_URL,
  DateFormat,
  pointTypes,
  DESCRIPTIONS,
  FilterType,
  SortTypes,
  EnabledSortType,
  getDefaultPoint,
  сapitalizeTheFirstLetter,
  Mode
};
