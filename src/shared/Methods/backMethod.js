import {BackHandler} from 'react-native';
export const handleAndroidBackButton = method => {
  BackHandler.addEventListener('hardwareBackPress', method);
};

export const removeAndroidBackButtonHandler = method => {
  BackHandler.removeEventListener('hardwareBackPress', method);
};
