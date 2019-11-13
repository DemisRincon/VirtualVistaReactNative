import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './HomeStyles';
import textToSpeach from '../../Functions/textToSpeach';

import {
  InitialText,
  titlePress,
  titleLongPress,
  cameraPress,
  cameraLongPress,
  instructionsPress,
  instructionsLongPress,
} from '../../Constants/HomeConstants';
import SplashScreen from '../SplashScreen';
const Home = ({navigation: {navigate}}) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      textToSpeach('Abriendo applicacion');
      var timerID = setInterval(() => {
        setIsPaused(true);
        console.log('interval finished');

        textToSpeach(InitialText);
      }, 2000);
      return function cleanup() {
        clearInterval(timerID);
      };
    }
  }, [isPaused]);

  const handlePress = name => e => {
    console.log(e.target, name);
    textToSpeach(name);
    if (name === cameraLongPress) {
      navigate('Camera');
    }
  };

  return (
    <>
      {!isPaused && <SplashScreen />}
      {isPaused && (
        <View style={styles.ViewStyle}>
          <TouchableOpacity
            onPress={handlePress(titlePress)}
            onLongPress={handlePress(titleLongPress)}
            style={Object.assign(styles.Title, styles.ViewContainer)}>
            <Text>Aplicación 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePress(cameraPress)}
            onLongPress={handlePress(cameraLongPress)}
            style={Object.assign(styles.Camera, styles.ViewContainer)}>
            <Text>Camara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePress(instructionsPress)}
            onLongPress={handlePress(instructionsLongPress)}
            style={Object.assign(styles.Instructions, styles.ViewContainer)}>
            <Text>Instrucciones</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default Home;
