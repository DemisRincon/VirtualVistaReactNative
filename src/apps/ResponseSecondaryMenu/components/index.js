import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../../shared/Methods/backMethod';
import performSpeak from '../../../shared/Methods/textToSpeach';
import styles from './ResponseMenuStyles';
export default class index extends Component {
  async componentDidMount() {
    handleAndroidBackButton(this.backPressed);
    const {navigation} = this.props;
    const response = navigation.getParam('list');
    console.log(response);
    await performSpeak(' esas en el menú secundario');
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    console.log('back');
     performSpeak('Estás en el menú de respuestas');
    return true;
  };
  render() {
    return (
      <View style={styles.PrincipalView}>
        <TouchableOpacity
          style={Object.assign(styles.Instructions, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Texto y palabras</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
