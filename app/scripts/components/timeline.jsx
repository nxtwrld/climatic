import React from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import SunCalc from 'suncalc';
import d3 from 'd3';
import forecastChart from '../projections/forecastChart'

class Timeline extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  //  console.log('P', nextProps);
    if(nextProps.hourly && nextProps.hourly.data) {
      forecastChart(this.chart, nextProps.hourly.data);


    }
  }

  showDetail (d, i) {
    this.props.showDetail(d, i);

  }

  render () {
    // list data from newest to oldest (current at the bottom)
    var data = (this.props.hourly) ? this.props.hourly.data : [];
    var l = data.length;
    var selected = this.props.selected;

    // Calculate tick height
    var tick = {
      height : (100/l) +'%'
    }

    function renderDay(time) {
      return (moment(time*1000).format('H') == 0) ? <div className="time-bar-day" onClick={() => this.showDetail(d, i)}>{moment(time*1000).format('dddd MMMM Do')}</div> : ''
    }

    // calculate sunrise and sunset
    var suntime = SunCalc.getTimes(new Date(), this.props.lat, this.props.lon);
    // generate day/night color for gradient
    var dayGradient = [];
    data.forEach((d, i) => {
      let hour = (new Date(d.time*1000)).getHours();
      dayGradient.push((( hour > moment(suntime.sunset).tz(this.props.timezone).format('H')
                          || hour < moment(suntime.sunrise).tz(this.props.timezone).format('H')
                        ) ? '#000' : '#FFF'))
    });
    var daylight = {
      background: 'linear-gradient(to bottom, '+  dayGradient.join(',') +')'
    }

    // Map heat scale colors
    var heatScale = d3.scale.linear().domain([-20,0,20,25,50]).range(["rgb(0, 87, 255)","rgb(120, 251, 238)","yellow","orange","red"])
    // generate heat colors gradient
    var heatGradient = [];
    data.forEach(function(d, i){
      heatGradient.push(heatScale(d.temperature) +' '+ (100/l*i)+"%");
    });
    var heat = {
      background: 'linear-gradient(to bottom, '+  heatGradient.join(',') +')'
    }

    return (
    <div className="time-bar">
      <div ref={(c) => this.chart = c} className="time-bar-chart">
        <div className="time-bar-chart-scale">
          <div>Light rain &lt; 2.5 mm</div>
          <div>Moderate rain &gt; 2.5 mm </div>
          <div>Heavy rain &gt; 7.6 mm</div>
          <div>Violent rain &gt; 50 mm</div>
        </div>
      </div>
      <div className="time-bar-daylight" style={daylight}></div>
      <div className="time-bar-heat" style={heat}></div>
      {data.map((d, i)=>{

        let cls = (i == selected) ? 'selected' : ''

        return (
          <div className={"time-bar-unit " + cls} onClick={() => this.showDetail(d, i)} key={d.time} style={tick}>
            {renderDay(d.time)}
            {moment(d.time*1000).format('H:mm')}
          </div>
        )
      })
      }
    </div>
    )
  }
};

export default Timeline;
