import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './CameraStyles';
import performSpeak from '../../../shared/Methods/textToSpeach';
import getPictureInfo from '../../../shared/Methods/getPictureInfo';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../../shared/Methods/backMethod';
export default class index extends Component {
  state = {
    isPhotoTaken: false,
  };
  async componentDidMount() {
    handleAndroidBackButton(this.backPressed);
    await performSpeak('Estás en cámara');
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    console.log('back');
    performSpeak('Estás en el menú principal');
    return true;
  };
  takePicture = async value => {
    if (value) {
      const options = {quality: 0.1, base64: true};
      const getData = await Promise.all([value.takePictureAsync(options)]);
      if (getData[0]) {
        this.setState({isPhotoTaken: true});
        await performSpeak('Analizando imagen. espere porfavor');
        const response = await Promise.all([getPictureInfo(getData[0].base64)]);
        await this.inform(response);
      }
    }
  };

  inform = async response => {
    if (response[0]) {
      const res = response[0];
      const {navigate} = this.props.navigation;
      performSpeak('respuestas obtenidas');
      await navigate('ResponsesMenu', {res});
    } else {
      await performSpeak(
        'resultados no obtenidos, revise su connexion a internet',
      );
    }
    this.setState({ isPhotoTaken: false });
  };
  render() {
    const {isPhotoTaken} = this.state;
    return (
      <>
        {isPhotoTaken ? (
          <View style={styles.ProccesView}>
            <Text style={styles.ButtonsText}>Procesando</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => this.takePicture(this.camera)}
            style={styles.Button}>
            <Text style={styles.ButtonsText}>Tomar foto</Text>
          </TouchableOpacity>
        )}

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
