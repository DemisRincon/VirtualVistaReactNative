import {Dimensions} from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
  ViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'powderblue',
    justifyContent: 'space-around',
  },
  ViewContainer: {
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Title: {
    backgroundColor: '#2C6BAD',
  },
  Camera: {
    backgroundColor: '#860E49',
  },
  Instructions: {
    backgroundColor: '#4B0E86',
  },
};
export default styles;
