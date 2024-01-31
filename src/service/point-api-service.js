import {Method, SourceUrl} from '../const.js';
import ApiService from '../framework/api-service.js';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({url: SourceUrl.POINTS}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: SourceUrl.OFFERS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: SourceUrl.DESTINATIONS}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${SourceUrl.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: SourceUrl.POINTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    await this._load({
      url: `${SourceUrl.POINTS}/${point.id}`,
      method: Method.DELETE,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': parseInt(point.basePrice, 10),
      'date_to': point.dateTo.toISOString(),
      'date_from': point.dateFrom.toISOString(),
      'is_favorite': point.isFavorite
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.isDeleting;
    delete adaptedPoint.isDisabled;
    delete adaptedPoint.isSaving;
    return adaptedPoint;
  }
}
