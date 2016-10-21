import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ForecastStore from '../stores/forecastStore';
import ForecastActions from '../actions/forecastActions';
import cities from '../../data/cities-geo.json';


var names = cities.features.map((f)=>{
  return f.properties.city;
})

class Header extends React.Component {

  constructor(props){
    super(props);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.state = {
      forecast : {},
      loading: true,
      suggestions : []
    }
  }

  geolocation () {
    navigator.geolocation.getCurrentPosition((position) => {
      ForecastActions.loadForecast({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }

  componentDidMount() {
    this.unsubscribe = ForecastStore.listen(this.onStatusChange.bind(this));
    this.geolocation();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange (state) {
    this.setState(state);
  }

  showPlace (index) {
    var coords = cities.features[index].geometry.coordinates
    ForecastActions.loadForecast({
      lat: coords[1],
      lon: coords[0]
    });
    this.clearSearch()

  }

  clearSearch() {
    var s = this.state;
    s.suggestions = [];
    s.searchValue = '';
    this.setState(s);
  }

  searchPlace (event) {
    var s = this.state;
    var v = event.target.value.toLowerCase();
    var suggestions = [];

    if(v != ''){
      names.forEach(function(n, i){
        if(n.toLowerCase().indexOf(v) == 0) {
          suggestions.push({
            index : i,
            name : n
          });
        }
      });
    }

    if(event.key == 'Enter'){

      if(suggestions.length>0) {
        this.showPlace(suggestions[0].index);
      }
      this.clearSearch();

    } else {

      s.suggestions = suggestions
      this.setState(s);
    }

  }

  render () {




    return (
      <div className="space-bar">
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" onKeyUp={this.searchPlace.bind(this)} placeholder="Search" value={this.state.searchValue} />
          </FormGroup>
        </Navbar.Form>
        <div className="suggestions">
        {this.state.suggestions.map((n)=>{

          function showPlace(){
            this.showPlace.bind(this)(n.index);
          }

          return (
            <div key={n.index} onClick={showPlace.bind(this)}>{n.name}</div>
          )
        })}
        </div>
      </div>
    )
  }
};

export default Header;
