import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  // State tradicional para armazenar a referência da foto (quando existir)
  const [foto, setFoto] = useState(null);

  // State de checagem de permissões de uso (através do hook useCameraPermission)
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  console.log(status);

  useEffect(() => {
    async function verificaPermissoes() {
      const camerastatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(camerastatus === "granted");
    }
    verificaPermissoes();
  }, []);

  const EscolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };
  // console.log(foto);

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });
    // console.log(imagem);

    // se o usuario não cancelar, atualizamos o state com a nova foto capturada
    if (!imagem.canceled) {
      // Usando a API do MediaLybrary para salvar no armazenamento fisico do dispositivo
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button title="Escolher foto" onPress={EscolherFoto} />
        <Button title="Tirar uma nova foto" onPress={acessarCamera} />
        {foto ? (
          <Image source={{ uri: foto }} style={{ width: 300, height: 300 }} />
        ) : (
          <Text>Você ainda não escolheu uma foto</Text>
        )}
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
