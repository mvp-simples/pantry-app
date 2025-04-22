import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

type Props = {
  editing: boolean;
  onCancel: () => void;
  onSave: () => void;
};

const AnimatedFABSwitcher: React.FC<Props> = ({ editing, onCancel, onSave }) => {
  const fabMainY = useRef(new Animated.Value(0)).current;
  const fabEditY = useRef(new Animated.Value(80)).current;
  const fabMainOpacity = useRef(new Animated.Value(1)).current;
  const fabEditOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (editing) {
      // Entrar no modo edição
      Animated.parallel([
        Animated.timing(fabMainY, {
          toValue: 80,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fabMainOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fabEditY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fabEditOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Sair do modo edição
      Animated.parallel([
        Animated.timing(fabMainY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fabMainOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fabEditY, {
          toValue: 80,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fabEditOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [editing]);

  return (
    <View style={styles.container}>
      {/* FAB principal */}
      <Animated.View
        style={[
          styles.fabMain,
          {
            transform: [{ translateY: fabMainY }],
            opacity: fabMainOpacity,
          },
        ]}
      >
        <TouchableOpacity style={styles.fab} onPress={() => console.log("FAB principal")}>
          <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* FABs de edição */}
      <Animated.View
        style={[
          styles.fabContainer,
          {
            transform: [{ translateY: fabEditY }],
            opacity: fabEditOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.fabButton, styles.cancelFab]}
          onPress={onCancel}
        >
          <Text style={styles.fabText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fabButton, styles.saveFab]}
          onPress={onSave}
        >
          <Text style={styles.fabText}>Salvar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabMain: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    width: screenWidth,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fabButton: {
    flex: 1,
    marginHorizontal: 4,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelFab: {
    backgroundColor: "#dc3545",
  },
  saveFab: {
    backgroundColor: "#28a745",
  },
  fabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AnimatedFABSwitcher;
