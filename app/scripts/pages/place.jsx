import React from 'react';
import ForecastStore from '../stores/forecastStore';
import Timeline from '../components/timeline.jsx';
import moment from 'moment';

class Place extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      forecast : {},
      loading : true,
      detail : {}
    };
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = ForecastStore.listen(this.onStatusChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange (state) {
    this.setState(state);
    if(this.state.forecast.hourly) {
      let l = this.state.forecast.hourly.data.length;
      this.showDetail(this.state.forecast.hourly.data[l-1], l-1);
    }
  }

  showDetail (d, i) {
    var s = this.state;
    s.detail = d;
    s.selected = i;
    this.setState(s);
  }

  render() {

    function loaded () {
      if(this.state.loading) {
        return (
          <div className="loading">Loading</div>
        )
      } else {
        return (
          <div>
            {details.bind(this)()}
            <Timeline timezone={this.state.forecast.timezone}
                      selected={this.state.selected}
                      showDetail={this.showDetail.bind(this)}
                      lat={this.state.forecast.latitude}
                      lon={this.state.forecast.longitude}
                      hourly={this.state.forecast.hourly}
                      />
          </div>
        );
      }
    }

    function details(){
      if(this.state.detail.summary) {
        return (
          <div className="canvas-details">
            <img src={"images/" + this.state.detail.icon + ".png"}/>
            <h3>{moment(this.state.detail.time*1000).format('dddd MMMM Do YYYY, H:mm')}</h3>
            <h2>{this.state.forecast.timezone}</h2>
            <h1>{this.state.detail.temperature} °C - {this.state.detail.summary}</h1>
            <p>Apparent temperature: <strong>{this.state.detail.apparentTemperature}</strong> °C</p>
            <p>Wind speed: <strong>{this.state.detail.windSpeed}</strong> meters per second</p>
            <p>Percipitation: <strong>{this.state.detail.precipIntensity}</strong> mm per hour</p>
            <p>Cloud cover: <strong>{this.state.detail.cloudCover}</strong> oktas</p>
            <p>Dew point: <strong>{this.state.detail.dewPoint}</strong> °C</p>
            <p>Humidity: <strong>{this.state.detail.humidity}</strong>%</p>
          </div>
        )
      } else {
        return '';
      }
    }

    return (
      <div>
        {loaded.bind(this)()}
      </div>
    );
  }
}

export default Place;
