import Tts from 'react-native-tts';
export const performSpeak = async text => {
  await Tts.stop();
  await Tts.speak(text);
};

export default performSpeak;
