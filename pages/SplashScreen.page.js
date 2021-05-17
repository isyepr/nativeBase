import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default class SplashScreen extends Component {
    async componentDidMount() {
        // You can load api data or any other thing here if you want
        const data = await this.navigateToHome();
        if (data !== null) {
            this.props.navigation.navigate('Login');
        }
    }
    navigateToHome = async () => {
        // Splash screen will remain visible for 2 seconds
        const wait = time => new Promise((resolve) => setTimeout(resolve, time));
        return wait(200).then(() => this.props.navigation.navigate('Login'))
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 25 }}>NATIVE AMERICAN</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});