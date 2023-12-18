import {points, getRandomPoint} from '../mock/points.js';

export default class EventPointsModel {
  eventPoints = Array.from({length: points.length}, getRandomPoint);

  getEventPoints() {
    return this.eventPoints;
  }

  getEventPointsById(id) {
    return (
      this.eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }
}
