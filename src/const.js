const SEC_IN_MINUTES = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_A_DAY = 24;
const MSEC_IN_SEC = 1000;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MINUTES * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_A_DAY;
const PICTURE_URL = 'https://loremflickr.com/248/152?random=';

const DATE_FORMAT = {
  hours: 'HH:mm',
  month: 'MMM D',
  date: 'YYYY-MM-DD',
  dateWithTime: 'YY/MM/DD HH:mm'
};

const POINT_TYPES = [
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

const sortingTypes = [
  {
    type: 'day',
    isChecked: true,
    isDisabled: false,
  },
  {
    type: 'event',
    isChecked: false,
    isDisabled: true,
  },
  {
    type: 'time',
    isChecked: false,
    isDisabled: false,
  },
  {
    type: 'price',
    isChecked: false,
    isDisabled: false,
  },
  {
    type: 'offers',
    isChecked: false,
    isDisabled: true,
  },
];

function getDefaultPoint() {
  return ({
    id: 'default-point-id',
    basePrice: 0,
    dateFrom: '',
    dateTo: '',
    destination: 0,
    isFavorite: false,
    offers: [],
    type: POINT_TYPES[5],
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
  DATE_FORMAT,
  POINT_TYPES,
  DESCRIPTIONS,
  FilterType,
  sortingTypes,
  getDefaultPoint,
  сapitalizeTheFirstLetter,
  Mode
};
