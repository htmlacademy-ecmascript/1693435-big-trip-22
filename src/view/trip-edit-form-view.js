import AbstractView from '../framework/view/abstract-view.js';
import {POINT_TYPES} from '../const.js';
import {humanizeTaskDueDate} from '../utils/point.js';
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
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" ${isSelected}>
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
  const {id, type, dateFrom, dateTo, basePrice} = eventPoint;
  const {name, description, pictures} = destination || {};
  const destinationName = name || '';
  const pointId = id || 0;
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
      ${createOffersListView(offers, selectedOffers)}
      ${destination ? createDestinationView(description, pictures) : ''}
    </form>
  </li>`
  );
}

export default class TripEditFormView extends AbstractView {
  #eventPoint = null;
  #destination = null;
  #allDestinations = null;
  #offers = null;
  #selectedOffers = null;
  #onCloseClick = null;
  #onSubmitForm = null;

  constructor({eventPoint, destination, allDestinations, offers, selectedOffers, onCloseClick, onSubmitForm}) {
    super();
    this.#eventPoint = eventPoint;
    this.#destination = destination;
    this.#allDestinations = allDestinations;
    this.#offers = offers;
    this.#selectedOffers = selectedOffers || null;
    this.#onCloseClick = onCloseClick;
    this.#onSubmitForm = onSubmitForm;

    if (this.#eventPoint.id !== 'default-point-id') {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeEditFrom);

      this.element.querySelector('.event__save-btn')
        .addEventListener('click', this.#submitEditFrom);
    }
  }

  get template() {
    return createTripEditFormView(this.#eventPoint, this.#destination, this.#allDestinations, this.#offers, this.#selectedOffers);
  }

  #closeEditFrom = (evt) => {
    evt.preventDefault();
    this.#onCloseClick();
  };

  #submitEditFrom = (evt) => {
    evt.preventDefault();
    this.#onSubmitForm();
  };
}
