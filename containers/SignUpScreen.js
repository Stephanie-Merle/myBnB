import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";

const SignInScreen = () => {
  const [inputState, setInput] = useState({
    username: "",
    email: "",
    password: "",
    description: "description"
  });

  const registration = async () => {
    try {
      const res = await axios.post(
        "https://airbnb-api.herokuapp.com/api/user/sign_up",
        {
          username: inputState.name,
          password: inputState.password,
          email: inputState.email,
          description: inputState.description
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e.message);
      return alert("something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        style={{ flex: 1, alignContent: "center" }}
        enabled
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.title} />
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none" //to avoid the first letter automatic uppercase when typing email
              placeholder="NAME"
              onChangeText={text => setInput({ ...inputState, username: text })}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="EMAIL"
              onChangeText={text => setInput({ ...inputState, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              autoCapitalize="none"
              onChangeText={text => setInput({ ...inputState, password: text })}
            />
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => {
                registration();
              }}
            >
              <Text style={styles.btnText2}>DONE</Text>
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
    height: 150,
    alignContent: "center",
    paddingTop: 45
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
