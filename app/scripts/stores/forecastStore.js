import Reflux from 'reflux';
import ForecastActions from '../actions/forecastActions';

let ForecastStore = Reflux.createStore({
  listenables: ForecastActions,

  init() {
    this.forecast = {};
  },

  loadForecast() {
    this.trigger({
      forecast : {},
      loading: true
    });
  },

  loadForecastCompleted(forecast) {
    this.forecast = forecast;

    this.trigger({
      forecast : this.forecast,
      loading: false
    });
  },

  loadForecastFailed(error) {
    this.trigger({
      forecast : {},
      error : error,
      loading: false
    });
  }

});

export default ForecastStore;
