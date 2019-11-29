import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import axios from "axios";
import { AsyncStorage } from "react-native";

const SignInScreen = ({ setToken }) => {
  const [inputState, setInput] = useState({ email: "", password: "" });
  const navigation = useNavigation();

  const logingIn = async () => {
    try {
      const res = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/log_in",
        inputState
      );

      // AsyncStorage is equivalent to cookies with React
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("id", res.data._id);
      return setToken(res.data.token);
    } catch (e) {
      return alert("Wrong email or password");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        style={{ flex: 1, alignContent: "center" }}
        enabled
      >
        <Ionicons
          name="md-home"
          style={styles.icon}
          size={150}
          color={"white"}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Welcome</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none" //to avoid the first letter automatic uppercase when typing email
              placeholder="Your email"
              onChangeText={text => setInput({ ...inputState, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Your password"
              secureTextEntry={true}
              onChangeText={text => setInput({ ...inputState, password: text })}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                logingIn();
              }}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.btnText2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85C5D3",
    maxHeight: Dimensions.get("window").height
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 20
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 50,
    minHeight: 100,
    flex: 1,
    alignContent: "center",
    paddingTop: 45
  },
  icon: {
    marginTop: Constants.statusBarHeight + 30,
    textAlign: "center",
    height: "auto"
  },
  input: {
    color: "white",
    paddingHorizontal: 15,
    fontSize: 20,
    height: 55,
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginHorizontal: "auto"
  },
  inputContainer: {
    textAlign: "center",
    width: 320,
    flex: 1,
    marginLeft: (Dimensions.get("window").width - 320) / 2
  },
  btn: {
    backgroundColor: "white",
    height: 55,
    borderRadius: 27.5,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center"
  },
  btnText: {
    color: "#85C5D3",
    textAlign: "center",
    fontSize: 30
  },
  btn2: {
    backgroundColor: "#85C5D3",
    height: 55,
    borderRadius: 27.5,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white"
  },
  btnText2: {
    color: "white",
    textAlign: "center",
    fontSize: 30
  }
});
