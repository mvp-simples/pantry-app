import React, { useEffect, useState } from "react";
import { View, FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FAB } from "react-native-paper";
import { GroceryItem, Stats } from "../../src/types";
import { getItems, getStats, uploadPdf } from "../../src/services/api";
import Layout from "@/src/components/layout";
import ItemCard from "@/src/components/itemCard";
import AnimatedFABSwitcher from "@/src/components/animatedFabSwitcher";

export default function HomeScreen() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [skip, setSkip] = useState(0);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [stats, setStats] = useState<Stats>({ total: 0, visits: 0, average: 0 });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const loadItems = async () => {
    if (loading) return;
    setLoading(true);
    console.log('ola')
    const res = await getItems();
    setItems(prev => {
      const newItems = res.data.filter((item: GroceryItem) => !prev.some(prevItem => prevItem.id === item.id));
      return [...prev, ...newItems];
    });
    setSkip(prev => prev + 20);
    setLoading(false);
  };

  const loadStats = async () => {
    const res = await getStats();
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
        await uploadPdf(formData);
        alert("PDF enviado com sucesso!");
        loadItems();
        loadStats();
      } catch (err) {
        console.error(err);
        alert("Erro ao enviar PDF");
      }
    }
  };

  const cancelEdit = () => setEditingItemId(null);
  const saveEdit = () => {
    // Aqui você pode implementar lógica extra antes de salvar, se quiser
    setEditingItemId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout total={stats.total} visits={stats.visits} average={stats.average} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Minha dispensa</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            onDecrement={() => { }}
            isEditing={editing}
            setIsEditing={setEditing}
          />
        )}
      />
      <AnimatedFABSwitcher
        editing={editing}
        onCancel={() => setEditing(false)}
        onSave={() => {
          console.log("Salvar!");
          setEditing(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    color: 'black',
    fontFamily: 'bold',
    fontSize: 20
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fabContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 16,
    left: 16,
    right: 16,
    gap: 12, // ou use marginHorizontal nos FABs se preferir
  },

  fabButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  cancelFab: {
    backgroundColor: "black",
  },

  saveFab: {
    backgroundColor: "#007bff",
  },

  fabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

});
