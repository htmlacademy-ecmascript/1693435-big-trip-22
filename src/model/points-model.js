import Observable from '../framework/observable.js';
import {points, getRandomPoint} from '../mock/points.js';
import {updateItem} from '../utils/point.js';

export default class EventPointsModel extends Observable {
  #eventPoints = Array.from({length: points.length}, getRandomPoint);

  get eventPoints() {
    return this.#eventPoints;
  }

  getEventPointsById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }

  updatePoint(updateType, updatedPoint) {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, newPoint) {
    this.#eventPoints.push(newPoint);
    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, point) {
    this.#eventPoints = this.#eventPoints.filter((item) => item.id !== point.id);
    this._notify(updateType, point);
  }
}
