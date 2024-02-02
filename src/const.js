const SEC_IN_MINUTES = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_A_DAY = 24;
const MSEC_IN_SEC = 1000;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MINUTES * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_A_DAY;

const SERVER_URL = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic H2ZermkmPmthc8DuSTJh';

const DateFormat = {
  HOURS: 'HH:mm',
  MONTH: 'MMM D',
  DATE: 'YYYY-MM-DD',
  DATE_WITH_TIME: 'YY/MM/DD HH:mm',
  HEADER_DATE_FORMAT: 'D MMM',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
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

const FilterTypes = {
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

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const EditTypes = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const UserActions = {
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const EmptyListMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
  ERROR: 'Failed to load latest route information',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SourceUrl = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
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

export {
  SEC_IN_MINUTES,
  HOUR_IN_A_DAY,
  MSEC_IN_HOUR,
  MSEC_IN_DAY,
  SERVER_URL,
  AUTHORIZATION,
  DateFormat,
  TimeLimit,
  pointTypes,
  FilterTypes,
  SortTypes,
  EnabledSortType,
  Mode,
  EditTypes,
  UserActions,
  UpdateTypes,
  EmptyListMessages,
  Method,
  SourceUrl,
  getDefaultPoint,
};
