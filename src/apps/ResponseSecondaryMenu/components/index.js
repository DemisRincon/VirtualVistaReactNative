import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../../shared/Methods/backMethod';
import performSpeak from '../../../shared/Methods/textToSpeach';
import styles from './ResponseMenuStyles';
import translate from '../../../shared/Apis/googleTranslate';
export default class index extends Component {
  state = {
    web: false,
    objects: false,
    text: false,
    list: [],
  };

  addItem = async item => {
    this.setState({list: [...this.state.list, item]});
  };
  componentDidMount = async () => {
    handleAndroidBackButton(this.backPressed);
    const {navigation} = this.props;
    const response = navigation.getParam('list').slice(0, 10);
    const text = navigation.getParam('text');
    await performSpeak('Estás en el menú de ' + text);
    response.forEach(async element => {
      console.log(element);
      const traduction = await translate(element.description);
      console.log(await traduction.data.translations[0].translatedText);
      this.addItem(await traduction.data.translations[0].translatedText);
    });
    await console.log(this.state);

    await performSpeak(' esas en el menú de ' + text);
    switch (text) {
      case 'coincidencias en la web':
        this.setState({web: true});
        break;
      case 'objetos encontrados':
        this.setState({objects: true});
        break;
      case 'texto y palabras':
        this.setState({text: true});
        break;

      default:
        break;
    }
  };
  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    console.log('back');
    performSpeak('Estás en el menú de respuestas');
    return true;
  };

  render() {
    const {list} = this.state;
    console.log(list);

    return (
      <View style={styles.PrincipalView}>
        {list &&
          list.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => performSpeak(item)}
              style={Object.assign(styles.Instructions, styles.ViewContainer)}>
              <Text style={styles.ButtonsText}>{item}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  }
}
