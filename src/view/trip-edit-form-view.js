import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EditTypes, pointTypes} from '../const.js';
import {humanizeTaskDueDate} from '../utils/point.js';
import {getElementByType, getElementById} from '../utils/common.js';
import {DateFormat, сapitalizeTheFirstLetter} from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

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
    isSelected = selectedOffers.includes(id) ? 'checked' : '';
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

function createDestinationView(destination, isDestination) {
  return isDestination ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      ${destination?.pictures.length > 0 ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map((picture) => destinationPhotosView(picture)).join('')}
      </div>
    </div>` : ''}
    </section>` : '<p class="event__destination-description">No pictures destination description</p>';
}

function createTripEditFormView (state, allDestinations, offers, editorMode) {
  const {
    id,
    type,
    dateFrom,
    dateTo,
    basePrice,
    destination,
    offers: selectedOffers,
    isDisabled,
    isSaving,
    isDeleting
  } = state;

  const pointId = id || 0;
  const destinationById = getElementById(allDestinations, destination);
  const {name} = destinationById || {};
  const destinationName = name || '';
  const isCreating = editorMode === EditTypes.CREATING;
  const offersByType = getElementByType(offers, type);

  let buttonText;
  if (isCreating) {
    buttonText = 'Cancel';
  } else if (isDeleting) {
    buttonText = 'Deleting...';
  } else {
    buttonText = 'Delete';
  }

  const isDestination = destinationById?.pictures.length > 0 || destinationById?.description.trim().length > 0;

  // console.log(destinationById);
  // console.log(destination);

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
            ${pointTypes.map((item) => createTypeTemplate(item, pointId)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${pointId}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-${pointId}" autocomplete="off" required>
        <datalist id="destination-list-${pointId}">  
          ${allDestinations.map((item) => createDestinationsOptionList(item.name)).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" 
        value="${isCreating ? '' : humanizeTaskDueDate(dateFrom, DateFormat.dateWithTime)}" required>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" 
        value="${isCreating ? '' : humanizeTaskDueDate(dateTo, DateFormat.dateWithTime)}" required>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${pointId}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${pointId}" type="number" min="0" name="event-price" value="${basePrice}" required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${buttonText}</button>
      ${isCreating ? '' :
      (`<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`)}
    </header>
    <section class="event__details">
      ${offersByType ? createOffersListView(offersByType, selectedOffers) : ''}
      ${createDestinationView(destinationById, isDestination)}
    </form>
  </li>`
  );
}

export default class TripEditFormView extends AbstractStatefulView {
  #allDestinations = null;
  #offers = null;
  #onCloseClick = null;
  #onSubmitForm = null;
  #handleDeleteClick = null;
  #datepickerDateTo = null;
  #datepickerDateFrom = null;
  #editorMode = null;

  constructor({eventPoint, allDestinations, offers, onCloseClick, onSubmitForm, onDeleteClick, editorMode = EditTypes.EDITING}) {
    super();
    this._setState(TripEditFormView.parsePointToState(eventPoint));
    this.#allDestinations = allDestinations;
    this.#offers = offers;
    this.#onCloseClick = onCloseClick;
    this.#onSubmitForm = onSubmitForm;
    this.#handleDeleteClick = onDeleteClick;
    this.#editorMode = editorMode;

    this._restoreHandlers();
  }

  reset = (point) => this.updateElement(TripEditFormView.parsePointToState(point));

  removeElement() {
    super.removeElement();

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }

    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }
  }

  get template() {
    return createTripEditFormView(this._state, this.#allDestinations, this.#offers, this.#editorMode);
  }

  #closeEditFrom = (evt) => {
    evt.preventDefault();
    this.#onCloseClick();
  };

  #submitEditFrom = (evt) => {
    evt.preventDefault();
    this.#onSubmitForm(this._state);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state);
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
    if (this.#editorMode === EditTypes.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditFrom);
      this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitEditFrom);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#closeEditFrom);
      this.element.querySelector('.event__save-btn').addEventListener('click', this.#submitEditFrom);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#handlerChangeEventType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#handlerChangeDestination);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#handlerPriceChange);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#handlerCahngeOffer);
    }

    this.#setDatePicker();
  }

  #handlerDateFromClose = ([userDate]) => {
    this._setState({...this._state, dateFrom: userDate});
    this.#datepickerDateTo.set('minDate', this._state.dateFrom);
  };

  #handlerDateToClose = ([userDate]) => {
    this._setState({...this._state, dateTo: userDate});
    this.#datepickerDateFrom.set('maxDate', this._state.dateTo);
  };

  #setDatePicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    const flatpickConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true,
    };

    this.#datepickerDateFrom = flatpickr(
      dateFromElement,
      {
        ...flatpickConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#handlerDateFromClose,
        maxDate: this._state.dateTo,
      }
    );

    this.#datepickerDateTo = flatpickr(
      dateToElement,
      {
        ...flatpickConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#handlerDateToClose,
        minDate: this._state.dateFrom,
      }
    );
  }

  static parsePointToState(eventPoint) {
    return {
      ...eventPoint,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const eventPoint = {...state};

    delete eventPoint.isDisabled;
    delete eventPoint.isSaving;
    delete eventPoint.isDeleting;

    return eventPoint;
  }
}
