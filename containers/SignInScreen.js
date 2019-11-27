import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import axios from "axios";
import { AsyncStorage } from "react-native";

const SignInScreen = ({ setToken }) => {
  const [inputState, setInput] = useState({ email: "", password: "" });

  const logingIn = async () => {
    try {
      const res = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        inputState
      );

      // AsyncStorage is equivalent to cookies with React
      await AsyncStorage.setItem("token", res.data.token);
      return setToken(res.data.token);
    } catch (e) {
      return alert("Wrong email or password");
    }
  };

  //TODO Add keyboardAvoidingView behavior="padding" to push up input field when displaying keyboard

  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="md-home"
          style={styles.icon}
          size={150}
          color={"white"}
        />
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
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            logingIn();
          }}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85C5D3"
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
    height: 200,
    alignContent: "center",
    paddingTop: 55
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
    marginLeft: (Dimensions.get("window").width - 320) / 2
  },
  btn: {
    backgroundColor: "white",
    height: 65,
    borderRadius: 40,
    width: 150,
    paddingTop: 15,
    marginLeft: (Dimensions.get("window").width - 150) / 2,
    marginTop: 20
  },
  btnText: {
    color: "#85C5D3",
    textAlign: "center",
    fontSize: 30
  }
});
