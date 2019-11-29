import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import MyMap from "../components/map";

export default function MapScreen() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchingData = async () => {
    try {
      let url = "https://airbnb-api.herokuapp.com/api/room?city=paris";
      const res = await axios.get(url);

      if (res.data.rooms) {
        //checking if response not empty
        getMarkers(res.data.rooms);
        setIsLoading(false);
      } else {
        alert("an error occured");
      }
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  const getMarkers = async data => {
    let myLocData = await data.map(item => {
      return { long: item.loc[0], lat: item.loc[1] };
    });
    setLocations(myLocData);
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#85C5D3" size="large" />
        </View>
      ) : (
        <View>
          <MyMap
            longitude={2.3424845}
            latitude={48.8564333}
            height={"100%"}
            myLocData={locations}
            delta={0.08}
          />
        </View>
      )}
    </>
  );
}
