import { setApiKeyValue } from "@/features/coin-gecko/coinGeckoSlice";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

const ApiKeyInput: React.FC = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>("");

  const saveApiKey = () => {
    dispatch(setApiKeyValue(input));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        focusable
        placeholder="Enter CoinGecko API Key"
        value={input}
        onChangeText={setInput}
      />

      <View style={styles.actionButton}>
        <Button color={"#fff"} title="Save API Key" onPress={saveApiKey} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: "#fff",
  },
  actionButton: {
    backgroundColor: "#673ab7",
    borderRadius: 5,
  },
});

export default ApiKeyInput;
