import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './HomeStyles';
import {performSpeak} from '../../../shared/Methods/textToSpeach';
import {
  InitialText,
  titlePress,
  titleLongPress,
  cameraPress,
  cameraLongPress,
  instructionsPress,
  instructionsLongPress,
} from '../constants/HomeConstants';
export default class SplashCompoent extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await performSpeak(InitialText);
  }
  handleOpenCamera = async () => {
    console.log('pressed');
    const {navigate} = this.props.navigation;
    await performSpeak(cameraLongPress);
    await navigate('Camera');
  };
  render() {
    return (
      <View style={styles.PrincipalView}>
        <TouchableOpacity
          onPress={() => performSpeak(titlePress)}
          onLongPress={() => performSpeak(titleLongPress)}
          style={Object.assign(styles.Title, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Aplicación 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => performSpeak(cameraPress)}
          onLongPress={this.handleOpenCamera}
          style={Object.assign(styles.Camera, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Camara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => performSpeak(instructionsPress)}
          onLongPress={() => performSpeak(instructionsLongPress)}
          style={Object.assign(styles.Instructions, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Instrucciones</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
