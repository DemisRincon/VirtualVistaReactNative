import Tts from 'react-native-tts';
const textToSpeach = text =>
  Tts.speak(text, {
    androidParams: {
      KEY_PARAM_PAN: -1,
      KEY_PARAM_VOLUME: 0.5,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },
  });
export default textToSpeach;
