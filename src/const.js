const SEC_IN_MINUTES = 60;
const HOUR_IN_A_DAY = 24;
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
    isDisabled: false,
  },
  {
    type: 'time',
    isChecked: false,
    isDisabled: true,
  },
  {
    type: 'price',
    isChecked: false,
    isDisabled: true,
  },
  {
    type: 'offers',
    isChecked: false,
    isDisabled: false,
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

export {SEC_IN_MINUTES, HOUR_IN_A_DAY, PICTURE_URL, DATE_FORMAT, POINT_TYPES, DESCRIPTIONS, FilterType, sortingTypes, getDefaultPoint, сapitalizeTheFirstLetter};
