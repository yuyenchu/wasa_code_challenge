import React, { useState, useEffect } from 'react';
import { Linking, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Button, DefaultTheme, Text} from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps';

function Map({data}) {
    let sum = data.reduce((acc, cur) => {
        let lat = parseFloat(cur.latitude);
        let lon = parseFloat(cur.longitude);
        return({ 
            latitude: acc.latitude+lat,
            longitude: acc.longitude+lon,
            maxLat: Math.max(acc.maxLat, lat), 
            maxLon: Math.max(acc.maxLon, lon),
            minLat: Math.min(acc.minLat, lat), 
            minLon: Math.min(acc.minLon, lon),
    })}, { latitude: 0 , longitude: 0, maxLat: -200, maxLon: -200, minLat: 200, minLon: 200});

    let cenLat = sum.latitude/data.length;  // center of all latitudes
    let cenLon = sum.longitude/data.length; // center of all longitudes
    // calculating the change in latitudes and longitudes each to the farthest marker
    // so all markers will be included in initial region
    let latDelta = Math.max(Math.abs(cenLat-sum.minLat),Math.abs(cenLat-sum.maxLat))*2+0.01;
    let lonDelta = Math.max(Math.abs(cenLon-sum.minLon),Math.abs(cenLon-sum.maxLon))*2+0.01;

    // generate map markers
    const generateMarker = () => {
        return data.map((val)=>{
            let lat = parseFloat(val.latitude);
            let lon = parseFloat(val.longitude);
            return (
                <>
                <Marker
                    key={val.id}
                    coordinate={{ latitude: lat , longitude: lon }}
                    title={val.name}
                    description={val.model}
                />
                </>
        )})
    }

    return(
        <>
            <Appbar.Header>
                <Appbar.Content title="Map" subtitle={'See your devices on map'} />
            </Appbar.Header>
            <View style={styles.container}>
                <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: cenLat,
                    longitude: cenLon,
                    latitudeDelta: latDelta,
                    longitudeDelta: lonDelta,
                }}
                >
                    {generateMarker()}
                </MapView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Map;