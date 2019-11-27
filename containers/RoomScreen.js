import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import SwiperFlatList from "react-native-swiper-flatlist";
import MyMap from "../components/map";

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPicture, setUserPicture] = useState("");

  const fetchingData = async () => {
    try {
      let url = "https://airbnb-api.now.sh/api/room/" + params.userId;
      const res = await axios.get(url);
      setData(res.data);
      setPhotos(res.data.photos);
      setUserPicture(res.data.user.account.photos[0]);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

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
          <View style={styles.container}>
            <SwiperFlatList>
              {photos.map((el, i) => {
                let imgUrl = String(el);
                return (
                  <View key={i} style={{ height: 300 }}>
                    <Image
                      style={styles.image}
                      source={{ uri: imgUrl }}
                      width={Dimensions.get("window").width}
                    />
                  </View>
                );
              })}
            </SwiperFlatList>

            <View style={styles.price}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  paddingLeft: 10,
                  paddingTop: 15
                }}
              >
                {data.price} €
              </Text>
            </View>
          </View>

          <View style={styles.infoRoom}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 26,
                  width: 320,
                  height: 40
                }}
              >
                {data.title}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-star"
                  size={20}
                  color={data.ratingValue > 0 ? "#f7d513" : "gray"}
                />
                <Ionicons
                  name="ios-star"
                  size={20}
                  color={data.ratingValue > 1 ? "#f7d513" : "gray"}
                />
                <Ionicons
                  name="ios-star"
                  size={20}
                  color={data.ratingValue > 2 ? "#f7d513" : "gray"}
                />
                <Ionicons
                  name="ios-star"
                  size={20}
                  color={data.ratingValue > 3 ? "#f7d513" : "gray"}
                />
                <Ionicons
                  name="ios-star"
                  size={20}
                  color={data.ratingValue > 4 ? "#f7d513" : "gray"}
                />
                <Text style={{ color: "gray", fontSize: 20, marginLeft: 15 }}>
                  {data.reviews} reviews
                </Text>
              </View>
            </View>
            <Image
              source={{ uri: userPicture }}
              style={{ width: 60, height: 60, borderRadius: 30, marginTop: 5 }}
            />
          </View>
          <Text
            numberOfLines={3}
            style={{
              fontSize: 26,
              width: 320,
              marginHorizontal: 10
            }}
          >
            {data.description}
          </Text>
          <MyMap longitude={data.loc[0]} latitude={data.loc[1]} />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 218
  },
  price: {
    position: "absolute",
    marginHorizontal: 10,
    marginVertical: 10,
    width: 78,
    height: 58,
    bottom: 5,
    backgroundColor: "rgba(33, 33, 33, 0.9)"
  },
  infoRoom: {
    color: "#251B12",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 5
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  image: {
    flex: 1,
    height: 300,
    backgroundColor: "transparent"
  },

  loadingView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.5)"
  }
});
