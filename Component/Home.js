import React, { useCallback, useState, useEffect } from 'react';
import { Linking, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, DefaultTheme, Text} from 'react-native-paper';
import { QR } from './Image.js';

const url = "https://rb.gy/svm1au"; // url for button link

function Home(props) {
    // opening url link in default browser if supported
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }, [url]);

    return(
        <>
            <Appbar.Header>
                <Appbar.Content title="Home" subtitle={'Main Menu'} />
            </Appbar.Header>
            <Text style={{...styles.headline, marginTop: 10}}>
                Scan QR code to register device
            </Text>
            <View style={styles.container}>
                <Image source={QR} style={styles.logo}/>
            </View>
            <Text style={styles.headline}>OR</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Press here to register manually</Text>
            </TouchableOpacity>
            {/* <Text>DEBUG: {JSON.stringify(props.data)}</Text> */}
        </>
    );
}

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 0,
        color: DefaultTheme.colors.primary,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        margin: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: DefaultTheme.colors.placeholder,
        padding: 10,
        marginTop: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    }
})

export default Home;