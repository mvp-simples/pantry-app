import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Appbar, Card, Text, IconButton, Divider, Avatar, ProgressBar, useTheme } from 'react-native-paper';

const transactions = [
  { name: 'Padaria', amount: 8.5, type: 'Pix', category: 'Comida & lanches', isOut: true },
  { name: 'Mercado', amount: 168.95, type: 'Cartão de Crédito', category: 'Mercado 1', isOut: true },
  { name: 'Mercado', amount: 2150.0, type: 'Pix', category: 'Mercadinho', isOut: true },
];

export default function Dashboard() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="light" backgroundColor="#000" translucent={false} />
      <Appbar.Header style={{ backgroundColor: colors.primary }}>
        <Appbar.Action icon="menu" onPress={() => { }} color='white' />
        <Appbar.Content title="Olá, Marcos!" subtitle="15 de Dezembro, 2024" titleStyle={{ color: 'white' }}
          subtitleStyle={{ color: '#ccc' }} />
        <Appbar.Action icon="account-circle" onPress={() => { }} color='white' />
        <Appbar.Action icon="bell" onPress={() => { }} color='white' />
      </Appbar.Header>

      <ScrollView style={{ padding: 16 }}>
        {/* Saldo disponível */}
        <Card style={{ marginBottom: 16, backgroundColor: colors.primary }}>
          <Card.Title title="Valor gasto" titleStyle={{ color: 'white' }} />
          <Card.Content>
            <Text variant="titleLarge" style={{ fontWeight: 'bold', color: 'white' }}>R$ 1.224,00</Text>
            <Text style={{ color: 'white' }}>↑ 10.88% em relação ao último mês</Text>
          </Card.Content>
        </Card>

        {/* Entradas e Saídas */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Card style={{ flex: 1, marginRight: 8 }}>
            <Card.Title title="Notas cadastradas" />
            <Card.Content>
              <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10 }}>5</Text>
              <Text style={{ color: 'green' }}>+ 3 em relação ao último mês</Text>
            </Card.Content>
          </Card>
          <Card style={{ flex: 1, marginLeft: 8 }}>
            <Card.Title title="Média semanal" />
            <Card.Content>
              <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 10 }}>R$ 306,00</Text>
              <Text style={{ color: 'red' }}>- 3.47% em relação ao último mês</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Transações recentes */}
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>Transações recentes</Text>
        {transactions.map((tx, i) => (
          <Card key={i} style={{ marginBottom: 8 }}>
            <Card.Title
              title={tx.name}
              subtitle={`${tx.category} • ${tx.type}`}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon={tx.isOut ? 'arrow-up' : 'arrow-down'}
                  style={{ backgroundColor: tx.isOut ? '#fdd' : '#dfd' }}
                  size={30}
                />
              )}
              right={(props) => <Text {...props} style={{ marginRight: 10 }}>R$ {tx.amount}</Text>}
            />
          </Card>
        ))}

        {/* Percentual dos custos mensais (simulação com ProgressBar) */}
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>Gastos por categoria</Text>
        <Card style={{ marginBottom: 40 }}>
          <Card.Content>
            <Text>Alimentação - R$ 956</Text>
            <ProgressBar progress={0.58} color="#3366FF" style={{ marginVertical: 4 }} />
            <Text>Limpeza - R$ 600</Text>
            <ProgressBar progress={0.36} color="#6699FF" style={{ marginVertical: 4 }} />
          </Card.Content>
        </Card>
      </ScrollView>

    </SafeAreaView>
  );
}
