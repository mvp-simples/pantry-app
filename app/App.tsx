// App.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import { Layout } from "./layout";
import * as DocumentPicker from "expo-document-picker";
import { FAB } from "react-native-paper";

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

const handlePickPdf = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    copyToCacheDirectory: true,
  });

  if (result.assets && result.assets[0]) {
    const pdf = result.assets[0];

    const formData = new FormData();
    formData.append("file", {
      uri: pdf.uri,
      type: "application/pdf",
      name: pdf.name,
    } as any);

    try {
      await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("PDF enviado com sucesso!");
      loadItems();
      loadStats();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar PDF");
    }
  }
};


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
      <FAB
  icon="plus"
  style={styles.fab}
  onPress={handlePickPdf}
  label="Adicionar nota"
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
