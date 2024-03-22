import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar>
        <View style={estilos.container}>
          <Button title="Escolher foto" />
          <Image style={{ width: 300, height: 300 }} />
        </View>
      </StatusBar>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
