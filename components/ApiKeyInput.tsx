import { setApiKeyValue } from "@/features/coin-gecko/coinGeckoSlice";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "./ThemedText";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.inputLabel}>CoinGecko API Key</ThemedText>
      <TextInput
        secureTextEntry
        style={styles.secretInput}
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
    gap: 10,
    marginTop: 20,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secretInput: {
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
