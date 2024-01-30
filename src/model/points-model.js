import Observable from '../framework/observable.js';
import {updateItem} from '../utils/point.js';
import {UpdateTypes} from '../const.js';

export default class EventPointsModel extends Observable {
  #eventPoints = [];
  #pointApiService = null;
  #destinationModel = null;
  #offersModel = null;

  constructor({service, destinationModel, offersModel}) {
    super();

    this.#pointApiService = service;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {
      await this.#destinationModel.init();
      await this.#offersModel.init();
      const points = await this.#pointApiService.points;
      this.#eventPoints = points.map(this.#adaptToClient);
    } catch(err) {
      this.#eventPoints = [];
    }

    this._notify(UpdateTypes.INIT);
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  getEventPointsById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }

  async updatePoint(updateType, updatPoint) {
    try {
      const response = await this.#pointApiService.updatePoint(updatPoint);
      const updatedPoint = this.#adaptToClient(response);
      this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, point) {
    try {
      const response = await this.#pointApiService.addPoint(point);
      const newPoint = this.#adaptToClient(response);
      this.#eventPoints = [
        newPoint,
        ...this.#eventPoints
      ];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, point) {
    try {
      await this.#pointApiService.deletePoint(point);
      this.#eventPoints = this.#eventPoints.filter((item) => item.id !== point.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      'basePrice': parseInt(point['base_price'], 10),
      'dateTo': new Date(point['date_to']),
      'dateFrom': new Date(point['date_from']),
      'isFavorite': point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
