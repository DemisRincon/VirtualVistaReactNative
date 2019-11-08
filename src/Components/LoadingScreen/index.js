import React from 'react';
import { View, Text } from 'react-native';
import styles from './SplashScreenStyles';
const SplashScreen = () => {
    return (
        <View style={styles.ViewContainer}>
            <Text style={styles.MainText}>Test App</Text>
        </View>
    );
};

export default SplashScreen;
