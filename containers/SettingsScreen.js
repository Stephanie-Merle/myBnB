import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#85C5D3",
          width: 150,
          height: 55,
          alignSelf: "center",
          borderRadius: "50%",
          justifyContent: "center"
        }}
        onPress={() => {
          setToken(null);
        }}
      >
        <Text style={{ color: "white", fontSize: 30, textAlign: "center" }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
