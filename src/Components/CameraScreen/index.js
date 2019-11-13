import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './scanStyle';
import config from '../../../config';
import LoadingScren from '../LoadingScreen';
import textToSpeach from '../../Functions/textToSpeach';
const Camera = ({navigation: {navigate}}) => {
  const [resp, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [webEntities, setWebEntities] = useState([]);
  const [labelAnotations, setLabelAnotations] = useState([]);
  const takePicture = async value => {
    if (value) {
      const options = {quality: 0.1, base64: true};
      const data = await value.takePictureAsync(options);
      console.log(data);
      callGoogleVIsionApi(data.base64);
      setIsLoading(true);
      textToSpeach('Cargando, espere por favor');
    }
  };

  const callGoogleVIsionApi = async base64 => {
    let googleVisionRes = await fetch(
      config.googleCloud.api + config.googleCloud.apiKey,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {type: 'LABEL_DETECTION', maxResults: 10},
                {type: 'TEXT_DETECTION', maxResults: 10},
                {type: 'WEB_DETECTION', maxResults: 10},
                ,
              ],
            },
          ],
        }),
      },
    );

    await googleVisionRes
      .json()
      .then(res => {
        if (res) {
          textToSpeach(
            'Datos recibidos, redirigiendo a el menú de cotenedores de palabras',
          );
          navigate('MenuResponse', { res });
          setResponse(res);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
        textToSpeach('error de aplicacion redirigiendo a cámara');
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.Container}>
      {isLoading && <LoadingScren />}
      {!isLoading && (
        <>
          <TouchableOpacity
            onPress={() => takePicture(this.camera)}
            style={styles.Button}>
            <Text>Tomar foto</Text>
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
      )}
    </View>
  );
};

export default Camera;
