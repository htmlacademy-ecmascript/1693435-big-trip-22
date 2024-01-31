export default class DestinationsModel {
  #destinations = [];
  #pointApiService = null;

  constructor(service) {
    this.#pointApiService = service;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id) || null
    );
  }

  async init() {
    this.#destinations = await this.#pointApiService.destinations;
    return this.#destinations;
  }
}
