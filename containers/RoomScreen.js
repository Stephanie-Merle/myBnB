import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, Image, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [photos, setPhotos] = useState([]);

  const fetchingData = async () => {
    try {
      let url = "https://airbnb-api.now.sh/api/room/" + params.userId;
      const res = await axios.get(url);
      setData(res.data);
      setPhotos(res.data.photos);
      console.log(res.data.photos);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <View>
      <View>
        {/* <Swiper style={styles.wrapper} loop={false}> */}
        <FlatList
          data={photos}
          keyExtractor={(el, index) => el + index}
          renderItem={el => {
            let url = String(el.item);
            return (
              <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={{ uri: url }}
                  height={120}
                />
              </View>
            );
          }}
        />
        {/* </Swiper> */}
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
    </View>
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
    width: 200,
    height: 100,
    flex: 1,
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
