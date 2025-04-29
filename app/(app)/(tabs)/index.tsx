import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Card, useTheme, Text, IconButton, ProgressBar } from "react-native-paper";

export default function HistoryScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulando um "axios.get" mas com mock
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                balance: 1800,
                income: 5000,
                expenses: 3200,
                categories: [
                  { name: t('categories.food'), amount: 1200 },
                  { name: t('categories.transport'), amount: 800 },
                  { name: t('categories.leisure'), amount: 600 },
                  { name: t('categories.health'), amount: 400 },
                ],
                goal: {
                  description: t('goal.buy_cellphone'),
                  amountSaved: 1500,
                  targetAmount: 3000,
                },
                comparison: {
                  percentage: -10,
                },
                consciousConsumptionScore: 85,
              }
            });
          }, 1000);
        });

        setDashboardData((response as any).data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.title}>Olá, Lídia!</Text>
          <Text style={styles.subtitle}>28 de Abril, 2025</Text>
        </View>
        <View>
          <IconButton icon={"filter"} />
        </View>
      </View>

      <Card style={{ marginBottom: 16, backgroundColor: '#873D2C' }}>
        <Card.Content>
          <Text variant="bodyLarge" style={{ color: 'white', fontWeight: 'bold' }}>Gasto Mensal</Text>
          <Text variant="titleLarge" style={{ fontWeight: 'bold', color: 'white' }}>R$ 1.224,00</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>↑ 10.88% em relação ao último mês</Text>
        </Card.Content>
      </Card>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <Card style={{ flex: 1, marginRight: 8, backgroundColor: theme.colors.secondary }}>
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Economias</Text>
            <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10, color: theme.colors.primary }}>R$ 106,00</Text>
            <Text style={{ color: 'green' }}>+ R$ 30 em relação ao último mês</Text>
          </Card.Content>
        </Card>
        <Card style={{ flex: 1, marginLeft: 8, backgroundColor: theme.colors.secondary }}>
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Ofertas</Text>
            <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10, color: theme.colors.primary }}>R$ 306,00</Text>
            <Text style={{ color: 'red' }}>- 3.47% em relação ao último mês</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Metas de economia */}
      <Card style={{ marginBottom: 16, backgroundColor: theme.colors.secondary }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ color: theme.colors.primary, }}>Metas de economia</Text>
          <View style={{ marginVertical: 8 }}>
            <Text style={{ color: theme.colors.primary, }}>Meta</Text>
            <ProgressBar progress={0.4} color={'green'} style={{ height: 8, borderRadius: 4 }} />
            <Text style={{ marginTop: 4, color: theme.colors.primary, }}>R$ 0 / R$ 0</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Categorias de despesas (gráfico de barras fake) */}
      <Card style={{ marginBottom: 40, backgroundColor: theme.colors.secondary }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ color: theme.colors.primary, marginBottom: 16 }}>
            Categorias de despesas
          </Text>

          {[
            { label: 'Alimentação', value: 956 },
            { label: 'Transporte', value: 450 },
            { label: 'Lazer', value: 320 },
            { label: 'Educação', value: 280 },
            { label: 'Outros', value: 150 },
          ].map((item, idx, array) => {
            const maxValue = Math.max(...array.map(i => i.value)); // calcular o maior valor dinamicamente
            const barMaxWidth = 130; // definir o espaço máximo para a barra
            const barWidth = (item.value / maxValue) * barMaxWidth;

            return (
              <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ width: 100, color: theme.colors.primary, fontSize: 14 }}>
                  {item.label}
                </Text>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      height: 10,
                      width: barWidth,
                      backgroundColor: colors.primary,
                      borderRadius: 5,
                      marginRight: 8,
                    }}
                  />
                  <Text style={{ color: theme.colors.primary, fontSize: 14 }}>
                    R$ {item.value}
                  </Text>
                </View>
              </View>
            );
          })}
        </Card.Content>
      </Card>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13332E",
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: "#F8D6C5",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
    color: "#F8D6C5",
    fontWeight: "500",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F8D6C5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13332E",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#13332E",
  },
  loadingText: {
    color: "#F8D6C5",
    fontSize: 18,
  },
});
