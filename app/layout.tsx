// layout.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StatsProps = {
  total: number;
  visits: number;
  average: number;
};

const Layout: React.FC<StatsProps> = ({ total, visits, average }) => {
  return (
    <View style={styles.summary}>
      <Text>Total: R$ {total.toFixed(2)}</Text>
      <Text>Idas: {visits}</Text>
      <Text>Média: R$ {average.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#eee",
  },
});

export default Layout;
