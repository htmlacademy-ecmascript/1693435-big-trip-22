import TripEventContainerView from '../view/trip-events-container-view.js';
import TripEditFormView from '../view/trip-edit-form-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortingView from '../view/sorting-view.js';
import WayPointView from '../view/waypoint-view.js';
import {render} from '../render.js';

export default class BodyTripEventsContainer {
  tripEventComponent = new TripEventContainerView();
  tripEventsListComponent = new TripEventsListView();

  constructor({tripEventContainer}) {
    this.tripEventContainer = tripEventContainer;
  }

  init() {
    render(this.tripEventComponent, this.tripEventContainer);
    render(new SortingView(), this.tripEventComponent.getElement());
    render(this.tripEventsListComponent, this.tripEventComponent.getElement());
    render(new TripEditFormView(), this.tripEventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WayPointView(), this.tripEventsListComponent.getElement());
    }
  }
}
