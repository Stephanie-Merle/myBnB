import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { AsyncStorage } from "react-native";

const ProfileScreen = () => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    try {
      const id = await AsyncStorage.getItem("id");
      console.log(id);
      let url = "https://airbnb-api.herokuapp.com/api/user/" + id;
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setUserData(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
      return alert("something went wrong");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? null : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              height: 150,
              width: 150,
              marginTop: 40,
              backgroundColor: "#85C5D3",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: "100%"
            }}
          >
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.description}>UPLOAD MY PICTURE</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{userData.account.username}</Text>
          <Text style={styles.description}>{userData.account.description}</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85C5D3",
    justifyContent: "center",
    alignContent: "center"
  },

  title: {
    textAlign: "center",
    color: "white",
    fontSize: 50,
    height: 150,
    alignContent: "center",
    paddingTop: 45
  },
  description: {
    color: "white",
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: "center"
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
