import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './CameraStyles';
import performSpeak from '../../../shared/Methods/textToSpeach';
import getPictureInfo from '../../../shared/Methods/getPictureInfo';
import translate from '../../../shared/Apis/googleTranslate';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../../shared/Methods/backMethod';
export default class index extends Component {
  state = {
    firstElementFound: 'No se detecta objeto',
  };

  async componentDidMount() {
    handleAndroidBackButton(this.backPressed);
    await performSpeak('Estás en captura continua');
    this.interval = setInterval(() => {
      this.takePicture(this.camera);
      console.log('8 seconds');
    }, 8000);
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.backPressed);
    clearInterval(this.interval);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    performSpeak('Estás en el menú principal');
    return true;
  };
  takePicture = async value => {
    if (value) {
      const options = {quality: 0.1, base64: true};
      const getData = await Promise.all([value.takePictureAsync(options)]);
      if (getData[0]) {
        console.log(getData[0]);
        await performSpeak('Analizando imagen');
        const response = await Promise.all([getPictureInfo(getData[0].base64)]);
        await this.inform(response);
      }
    }
  };

  inform = async response => {
    if (response[0]) {
      const res =
        response[0].responses[0].webDetection.webEntities[0].description;
      const traduction = await translate(res);

      await performSpeak(traduction.data.translations[0].translatedText);
      this.setState({
        firstElementFound: traduction.data.translations[0].translatedText,
      });
    } else {
      await performSpeak(
        'resultados no obtenidos, revise su connexion a internet',
      );
    }
  };
  render() {
    const {firstElementFound} = this.state;
    return (
      <>
        <TouchableOpacity
          onPress={() => this.takePicture(this.camera)}
          style={styles.Button}>
          <Text style={styles.ButtonsText}>{firstElementFound}</Text>
        </TouchableOpacity>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
      </>
    );
  }
}
