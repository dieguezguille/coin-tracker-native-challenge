import { setApiKeyValue } from "@/features/coin-gecko/coinGeckoSlice";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ApiKeyInput: React.FC = () => {
  const { apiKeyValue } = useSelector((state: RootState) => state.coinGecko);
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>("");

  const saveApiKey = () => {
    dispatch(setApiKeyValue(input));
  };

  useEffect(() => {
    if (apiKeyValue) {
      setInput(apiKeyValue);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        focusable
        placeholder="Enter your CoinGecko API Key"
        value={input}
        onChangeText={setInput}
      />

      <View style={styles.actionButton}>
        <Button color="#ffffff" title="Save" onPress={saveApiKey} />
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
    fontSize: 16,
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
