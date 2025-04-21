// App.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import { Layout } from "./layout";

const API_URL = "http://localhost:3001";

type GroceryItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Stats = {
  total: number;
  visits: number;
  average: number;
};

export default function App() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [skip, setSkip] = useState(0);
  const [stats, setStats] = useState<Stats>({ total: 0, visits: 0, average: 0 });
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    if (loading) return;
    setLoading(true);
    const res = await axios.get(`${API_URL}/items?skip=${skip}&take=20`);
    setItems(prev => [...prev, ...res.data]);
    setSkip(prev => prev + 20);
    setLoading(false);
  };

  const loadStats = async () => {
    const res = await axios.get(`${API_URL}/stats`);
    setStats(res.data);
  };

  useEffect(() => {
    loadItems();
    loadStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Layout total={stats.total} visits={stats.visits} average={stats.average} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadItems}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
