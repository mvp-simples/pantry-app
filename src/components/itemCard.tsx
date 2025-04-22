import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  name: string;
  quantity: number;
  onDecrement: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
};

const ItemCard: React.FC<Props> = ({
  name,
  quantity,
  onDecrement,
  isEditing,
  setIsEditing,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.controls}>
        {isEditing && (
          <TouchableOpacity onPress={onDecrement} style={styles.transparentButton}>
            <MaterialIcons name="remove-circle-outline" size={28} color="#007bff" />
          </TouchableOpacity>
        )}
        <Text style={styles.quantity}>{quantity}</Text>
      </View>

      <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
        <MaterialIcons name={"edit"} size={20} color="#333" style={isEditing ? { opacity: 0 } : {}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 25,
    color: "#333",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  transparentButton: {
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 25,
    minWidth: 20,
    textAlign: "center",
  },
  editButton: {
    marginLeft: 8,
  },
});

export default ItemCard;
