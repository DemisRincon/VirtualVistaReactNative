import React, { Component } from 'react'
import { Text, View } from 'react-native'
import performSpeak from '../../../shared/Methods/textToSpeach';
export default class ResponsesMenu extends Component {
    async componentDidMount() {
        const { navigation } = this.props;
        console.log('respuestas',navigation.getParam('res'));
        
        await performSpeak('Estás en el menú de respuestas');
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
