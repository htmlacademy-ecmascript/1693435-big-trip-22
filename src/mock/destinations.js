import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {PICTURE_URL, DESCRIPTIONS} from '../const.js';

const MAX_RANDOM_COUNT = 1000;

const destinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab1',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab2',
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'New Yourk',
    pictures: [
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'New Yourk parliament building'
      },
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'New Yourk State of Liberty'
      },
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'New Yourk Time Squear'
      },
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab3',
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Dubai',
    pictures: [
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'Dubai Burj Khalifa'
      },
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'Dubai Ski Dubai'
      },
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab4',
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Pekin',
    pictures: []
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab5',
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Paris',
    pictures: [
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'Paris Eiffel Tower'
      },
      {
        src: PICTURE_URL + getRandomInteger(MAX_RANDOM_COUNT),
        description: 'Paris Louvre'
      },
    ]
  },
];

export {destinations};
