import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './SplashComponentStyles';
import {performSpeak} from '../../../shared/Methods/textToSpeach';

export default class SplashCompoent extends Component {
  constructor(props) {
    super(props);
  }

  countTime = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    const results = await Promise.all([
      this.countTime(),
      performSpeak('Iniciando Aplicación'),
    ]);
    if (results !== null) {
      this.props.handleSplashScreem();
    }
  }
  render() {
    return (
      <View style={styles.PrincipalView}>
        <Text style={styles.SplashText}> Virtual Vista </Text>
      </View>
    );
  }
}
