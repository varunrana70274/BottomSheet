import {StyleSheet, View, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const handleSearchLocation = (data, details) => {
    setSearchLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  return (
    <View style={styles.container}>
      {searchLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: searchLocation.latitude,
            longitude: searchLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {searchLocation && (
            <Marker
              coordinate={{
                latitude: searchLocation.latitude,
                longitude: searchLocation.longitude,
              }}
              title="Searched Location"
              description="This is the searched location"
            />
          )}
        </MapView>
      ) : (
        <>
          {currentLocation && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Searched Location"
                description="This is the searched location"
              />
            </MapView>
          )}
        </>
      )}

      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handleSearchLocation}
        query={{
          key: 'AIzaSyBmKk6d2xyRMPymwGSPkRkL2DANhyx4keI',
          language: 'en',
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            zIndex: 9999,
          },
          textInput: {
            height: 40,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 5,
            paddingHorizontal: 10,
          },
          listView: {
            position: 'absolute',
            backgroundColor: '#fff',
            zIndex: 9999,
            marginTop: 40,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
