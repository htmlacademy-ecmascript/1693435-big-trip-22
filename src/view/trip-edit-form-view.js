import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {POINT_TYPES} from '../const.js';
import {humanizeTaskDueDate} from '../utils/point.js';
import {getElementByType, getElementById} from '../utils/common.js';
import {DATE_FORMAT, сapitalizeTheFirstLetter} from '../const.js';

function createTypeTemplate (type, id) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${сapitalizeTheFirstLetter(type)}</label>
    </div>`
  );
}

function createDestinationsOptionList(name) {
  return `<option value="${name}"></option>`;
}

function createOfferView(offer, selectedOffers) {
  const {id, title, price} = offer;
  let isSelected = '';
  if (selectedOffers) {
    isSelected = selectedOffers.map((item) => item.id).includes(id) ? 'checked' : '';
  }

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" data-offer-id=${id} type="checkbox" name="event-offer-luggage" ${isSelected}>
      <label class="event__offer-label" for="event-offer-luggage-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOffersListView({offers}, selecteddOffers) {
  if (offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => createOfferView(offer, selecteddOffers)).join('')}
        </div>
      </section>`
    );
  }

  return '';
}

function destinationPhotosView({src, description}) {
  return `<img class="event__photo" src="${src}" alt="${description}">`;
}

function createDestinationView(description, pictures) {
  if (pictures.length !== 0) {
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
  
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((picture) => destinationPhotosView(picture)).join('')}
          </div>
        </div>
      </section>`
    );
  }

  return '';
}

function createTripEditFormView (eventPoint, destination, allDestinations, offers, selectedOffers) {
  const {id, type, dateFrom, dateTo, basePrice, destination: pointDestination} = eventPoint;
  const pointId = id || 0;
  const destinationById = getElementById(allDestinations, pointDestination);
  const offersByType = getElementByType(offers, type);
  const {name, description, pictures} = destinationById || {};
  const destinationName = name || '';

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((item) => createTypeTemplate(item, pointId)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${pointId}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${destinationName}" list="destination-list-${pointId}">
        <datalist id="destination-list-${pointId}">  
          ${allDestinations.map((item) => createDestinationsOptionList(item.name)).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${humanizeTaskDueDate(dateFrom, DATE_FORMAT.dateWithTime)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${humanizeTaskDueDate(dateTo, DATE_FORMAT.dateWithTime)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${pointId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${id !== 'default-point-id' ? 'Delete' : 'Cancel'}</button>
      ${id !== 'default-point-id' ?
      (`<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`)
      : ''}
    </header>
    <section class="event__details">
      ${offersByType.length !== 0 ? createOffersListView(offersByType, selectedOffers) : ''}
      ${destination ? createDestinationView(description, pictures) : ''}
    </form>
  </li>`
  );
}

export default class TripEditFormView extends AbstractStatefulView {
  #destinations = null;
  #destination = null;
  #allDestinations = null;
  #offers = null;
  #selectedOffers = null;
  #onCloseClick = null;
  #onSubmitForm = null;

  constructor({eventPoint, destinations, destination, allDestinations, offers, selectedOffers, onCloseClick, onSubmitForm}) {
    super();
    this._setState(TripEditFormView.parsePointToState(eventPoint));
    this.#destinations = destinations;
    this.#destination = destination;
    this.#allDestinations = allDestinations;
    this.#offers = offers;
    this.#selectedOffers = selectedOffers || null;
    this.#onCloseClick = onCloseClick;
    this.#onSubmitForm = onSubmitForm;

    this._restoreHandlers();
  }

  reset = (point) => this.updateElement(point);

  removeElement() {
    super.removeElement();
  }

  get template() {
    return createTripEditFormView(this._state, this.#destination, this.#allDestinations, this.#offers, this.#selectedOffers);
  }

  #closeEditFrom = (evt) => {
    evt.preventDefault();
    this.#onCloseClick();
  };

  #submitEditFrom = (evt) => {
    evt.preventDefault();
    this.#onSubmitForm(this._state);
  };

  #handlerChangeEventType = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
    });
  };

  #handlerChangeDestination = (evt) => {
    const selectedDestination = this.#allDestinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({
      ...this._state,
      destination: selectedDestinationId,
    });
  };

  #handlerCahngeOffer = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      ...this._state,
      offers: checkedBoxes.map((element) => element.dataset.offerId)
    });
  };

  #handlerPriceChange = (evt) => {
    this._setState({...this._state, basePrice: evt.target.value});
  };

  _restoreHandlers() {
    if (this._state.id !== 'default-point-id') {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeEditFrom);

      this.element.querySelector('.event__save-btn')
        .addEventListener('click', this.#submitEditFrom);
    }

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#handlerChangeEventType);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#handlerChangeDestination);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('click', this.#handlerCahngeOffer);
    }

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#handlerPriceChange);
  }

  static parsePointToState(eventPoint) {
    return {...eventPoint};
  }

  static parseStateToPoint(state) {
    const eventPoint = {...state};

    return eventPoint;
  }
}
