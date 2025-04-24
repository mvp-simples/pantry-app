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
      <View>
        <Text style={styles.center}>Idas ao mercado</Text>
        <Text style={styles.center}>{visits}</Text>
      </View>

      <View>
        <Text style={styles.center}>Total Gasto</Text>
        <Text style={styles.center}>R$ {total.toFixed(2)}</Text>
      </View>

      <View>
        <Text style={styles.center}>Custo médio</Text>
        <Text style={styles.center}>R$ {average.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Layout;
