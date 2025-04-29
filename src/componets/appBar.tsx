import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function AppBar() {
  return (
    <View style={styles.appBar}>
      <Image
        source={require("../../assets/images/logo_no_bg.png")}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.profileButton}>
        {/* Pode ser um ícone ou imagem do perfil */}
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }} // Avatar mocado
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: "#13332E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 16,
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  logo: {
    height: 30,
    width: 120
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#F8D6C5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});
