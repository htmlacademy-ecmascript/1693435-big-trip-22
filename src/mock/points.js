import {getRandomArrayElement} from '../utils/common.js';
import {nanoid} from 'nanoid';

const points = [
  {
    id: nanoid(),
    basePrice: 2300,
    dateFrom: '2023-12-15T12:55:56.845Z',
    dateTo: '2023-12-15T13:11:56.845Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab1',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa3111',
      'b4c3e4e6-9053-42ce-b747-e281314baa3112',
      'b4c3e4e6-9053-42ce-b747-e281314baa3113'
    ],
    type: 'taxi'
  },
  {
    id: nanoid(),
    basePrice: 1700,
    dateFrom: '2024-01-08T01:55:56.845Z',
    dateTo: '2024-01-12T09:00:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab2',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa3153',
      'b4c3e4e6-9053-42ce-b747-e281314baa3154'
    ],
    type: 'flight'
  },
  {
    id: nanoid(),
    basePrice: 1100,
    dateFrom: '2024-04-20T10:55:56.845Z',
    dateTo: '2024-04-20T13:25:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab4',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa3133'
    ],
    type: 'train'
  },
  {
    id: nanoid(),
    basePrice: 1600,
    dateFrom: '2024-07-19T00:55:56.845Z',
    dateTo: '2024-08-01T10:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab5',
    isFavorite: true,
    offers: [],
    type: 'check-in'
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points),
  };
}

export {points, getRandomPoint};
