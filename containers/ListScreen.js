import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function ListScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  // TODO add activityIndicator and loading state

  const fetchingData = async () => {
    try {
      const res = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      if (res.data.rooms) {
        //checking if response not empty
        setData(res.data.rooms);
      } else {
        alert("an error occured");
      }
    } catch (e) {
      alert("an error occured");
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

  // to store the stars and access them in the return statement
  const getStars = val => {
    const myStars = [];

    // conditionally render stars up to the rate
    for (let i = 0; i < 5; i++) {
      if (i < val) {
        myStars.push(
          <Ionicons key={i} name="ios-star" size={20} color="#f7d513" />
        );
      } else {
        myStars.push(
          <Ionicons key={i} name="ios-star" size={20} color="gray" />
        );
      }
    }
    return myStars;
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              title="Go to room"
              onPress={() => {
                navigation.navigate("Room", { userId: item._id });
              }}
            >
              <View>
                <Image
                  source={{ uri: item.photos[0] }}
                  style={styles.imageContainer}
                />
                <View style={styles.price}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 15
                    }}
                  >
                    {item.price} €
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
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    {getStars(item.ratingValue)}
                    <Text
                      style={{ color: "gray", fontSize: 20, marginLeft: 15 }}
                    >
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.user.account.photos[0] }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
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
  }
});
