import React from 'react';
import {View, Text} from 'react-native';

const ResponseMenuScreen = ({navigation}) => {
  const res = navigation.getParam('res');
  res.responses[0].webDetection &&
    res.responses[0].webDetection.webEntities.forEach(item => {
      item.description &&
        setWebEntities(webEntities.push(item.description));
    });
  console.log('web entities', webEntities);
  res.responses[0].labelAnnotations &&
    res.responses[0].labelAnnotations.forEach(
      item =>
        item.description &&
        setLabelAnotations(labelAnotations.push(item.description)),
    );
  return (
    <View>
      <Text>Response screen</Text>
    </View>
  );
};

export default ResponseMenuScreen;
