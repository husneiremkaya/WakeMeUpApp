import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, SafeAreaView, Platform} from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {CustomHeader} from '../drawer'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const GOOGLE_MAPS_API_KEY = 'AIzaSyD5PYmI45nrq6W_23uJCCJQDF_z9gziQtU'; 
const LATITUDE = 40.776685;
const LONGITUDE = 30.234491;
const LATITUDE_DELTA = 0.9522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let id = 0;
let km = 'Kilometre: 0 km';
let dk = 'Dakika: 0 dk';


export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: null,
    };
    this.mapView = null;

  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            accuracy: position.coords.accuracy
          }
        });
      },
      (error) => alert(error.message),
      { timeout: 10000 }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        accuracy: position.coords.accuracy
      }
      this.setState({ newRegion });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  onMapPress(e) {
    id = 0;
    this.setState({
      marker: e.nativeEvent.coordinate,
      key: id++,

    });
  }

  konumsil = () => {
    if (id === 0) {
      Alert.alert('Konum Silebilmek İçin Lütfen Bir Adet Konum Seçiniz...')
    }
    else {
      id = 0,
        this.setState({ markers: null })
      km = 'Kilometre: 0 km';
      dk = 'Dakika: 0 dk';
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Konum Bul" isHome={true} navigation={this.props.navigation}/>
      <View style={styles.container}>
      <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          followUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          ref={c => this.mapView = c}
          onPress={e => this.onMapPress(e)}
        >
          {
            this.state.marker &&
            <MapView.Marker coordinate={this.state.marker} />

          }
          {(id >= 1) && (
            <MapViewDirections
              origin={this.state.newRegion}
              destination={this.state.marker}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                secilen = (`"${params.destination}"`);
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
                km = (`Kilometre: ${result.distance} km`)
                dk = (`Dakika: ${result.duration} min.`)
                if ((`Distance: ${result.distance} km`) == (`Distance: 1 km`)) {
                
                  Alert.alert('Hedef Konuma Az Kaldı...')
                

                }
                else if ((`Distance: ${result.distance} km`) == (`Distance: 0 km`)) {
                  
                  Alert.alert('Hedef Konuma Geldiniz..')
                  
                }

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View style={styles.buttonContainer}>
          <Text style={styles.bubble}>{km} , {dk}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bubble}
            onPress={() => this.konumsil()}
          >
            <Text>Konumu Sil</Text>
          </TouchableOpacity>

        </View>
      </View>
      </SafeAreaView>
    );
  }
}

/*Home.propTypes = {
  provider: ProviderPropType,

};*/

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop:80,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});