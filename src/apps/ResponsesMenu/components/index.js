import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './ResponseMenuStyles';
import performSpeak from '../../../shared/Methods/textToSpeach';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../../shared/Methods/backMethod';
export default class ResponsesMenu extends Component {
  state = {
    labelAnnotations: [],
    textAnnotations: [],
    webDetection: [],
  };
  async componentDidMount() {
    handleAndroidBackButton(this.backPressed)
    const {navigation} = this.props;
    const response = navigation.getParam('res').responses[0];
    if (response) {
      this.setState({
        labelAnnotations: response.labelAnnotations
          ? response.labelAnnotations
          : this.state.labelAnnotations,
        textAnnotations: response.textAnnotations
          ? response.textAnnotations
          : this.state.textAnnotations,
        webDetection: response.webDetection
          ? response.webDetection
          : this.state.webDetection,
      });
    }
    await performSpeak('Estás en el menú de respuestas');
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    console.log('back');
    performSpeak('Estás en Cámara');
    return true;
  };
  async handleGoToPage(text, list) {
    if (list.length) {
      await performSpeak('redirigiendo a el menú de ' + text);
      const {navigate} = this.props.navigation;
      await navigate('ResponsesMenuSecondary', {list});
    } else {
      await performSpeak(
        'No se puede entrar al menú de ' +
          text +
          ' ya que éste no contiene respuestas',
      );
    }
  }

  render() {
    const {labelAnnotations, textAnnotations, webDetection} = this.state;
    return (
      <View style={styles.PrincipalView}>
        <TouchableOpacity
          onPress={() =>
            performSpeak('Objetos captados: ' + String(labelAnnotations.length))
          }
          onLongPress={() =>
            this.handleGoToPage('objetos encontrados', labelAnnotations)
          }
          style={Object.assign(styles.Title, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Objetos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            performSpeak(
              'Relaciones encontradas en internet: ' +
                String(webDetection.webEntities.length),
            )
          }
          onLongPress={() =>
            this.handleGoToPage(
              'coincidencias en la web',
              webDetection.webEntities,
            )
          }
          style={Object.assign(styles.Camera, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Coincidencias en internet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            performSpeak(
              'Texto y palabras encontradas en la imagen: ' +
                (textAnnotations.length
                  ? String(textAnnotations.length)
                  : 'cero'),
            )
          }
          onLongPress={() =>
            this.handleGoToPage('texto y palabras', textAnnotations)
          }
          style={Object.assign(styles.Instructions, styles.ViewContainer)}>
          <Text style={styles.ButtonsText}>Texto y palabras</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
