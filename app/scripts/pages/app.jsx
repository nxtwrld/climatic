import React from 'react';
import Header from '../components/header.jsx';
import { PropTypes } from 'react-router';


class App extends React.Component {

  constructor(props){
    super(props);


  }

  render (){
    return (
      <div>
            <Header {...this.props} />
            {this.props.children}
      </div>
    );
  }
};

App.contextTypes = { history: PropTypes.history }


export default App;
