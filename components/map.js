import React, { useEffect, useState, useCallback } from "react";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function MyMap(props) {
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // useCallback so the function is only declared once by component lifetime, good for perf
  const getLocationAsync = useCallback(async () => {
    // Asking for authorization to get GPS coordinates
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Request denied");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        setLocation(location);
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

  return (
    <>
      {isLoading ? null : (
        <MapView
          showsUserLocation={true}
          height={200}
          initialRegion={{
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
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
