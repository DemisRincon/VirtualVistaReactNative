import React, {Component} from 'react';

import SplashSceen from './SplashComponent';
import Home from './Home';
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplashSActive: true,
    };
  }
  handleSplashScreem = () => {
    this.setState({isSplashSActive: false});
  };
  render() {
    return (
      <>
        {this.state.isSplashSActive ? (
          <SplashSceen handleSplashScreem={this.handleSplashScreem} />
        ) : (
            <Home navigation={this.props.navigation} />
        )}
      </>
    );
  }
}
