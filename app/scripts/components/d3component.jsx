import React from 'react';
import sunburst from '../projections/tree.sunburst.js';

class D3Component extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    sunburst(this.projection, this.props.data);
  }

  render () {
    return <div ref={(c) => this.projection = c} style={{width: '100%', height: '100%'}}></div>
  }
}

export default D3Component;
