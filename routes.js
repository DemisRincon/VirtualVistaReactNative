import Home from './src/Components/Home';
import Camera from './src/Components/CameraScreen';
import MenuResponse from './src/Components/ResponseMenuScreen';
export default {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: ' Home',
      headerStyle: {
        backgroundColor: '#2C6BAD',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },
  Camera: {
    screen: Camera,
  },
  MenuResponse: {
    screen: MenuResponse,
  },
};
