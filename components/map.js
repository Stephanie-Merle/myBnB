import React, { useEffect, useState, useCallback } from "react";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function MyMap(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userPosition, setUserPosition] = useState({
    lat: 48.8564333,
    long: 2.3424845
  });
  // useCallback so the function is only declared once by component lifetime, good for perf
  const getLocationAsync = useCallback(async () => {
    // Asking for authorization to get GPS coordinates
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Request denied");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        console.log(location);
        setUserPosition({
          lat: location.coords.latitude,
          long: location.coords.longitude
        });
        setIsLoading(false);
      } else {
        alert("an error occured");
        setIsLoading(false);
      }
    }
  });
  useEffect(() => {
    getLocationAsync();
  }, []);
  let locations = null;
  if (props.myLocData) {
    locations = props.myLocData;
  }

  let myMarkers = null;
  if (locations) {
    myMarkers = locations.map(el => (
      <MapView.Marker
        key={el.lat}
        coordinate={{
          latitude: el.lat,
          longitude: el.long
        }}
      />
    ));
  }
  return (
    <>
      {isLoading ? null : locations ? (
        <MapView
          provider={"google"} // if not Apple map preview
          showsUserLocation={true}
          height={props.height}
          initialRegion={{
            latitude: userPosition.lat,
            longitude: userPosition.long,
            latitudeDelta: props.delta,
            longitudeDelta: props.delta
          }}
        >
          {myMarkers}
        </MapView>
      ) : (
        <MapView
          provider={"google"} // if not Apple map preview
          showsUserLocation={true}
          height={props.height}
          initialRegion={{
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: props.delta,
            longitudeDelta: props.delta
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: props.latitude,
              longitude: props.longitude
            }}
          />
        </MapView>
      )}
    </>
  );
}
