import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';

export default function ListaDeReceitas({ navigation }) {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    loadReceitas();
  }, [receitas]);

  async function loadReceitas() {
    const response = await AsyncStorage.getItem('receitas');
    const receitasStorage = response ? JSON.parse(response) : [];
    setReceitas(receitasStorage);
  }

  async function adicionarReceita(receita) {
    let novaListaReceitas = receitas;
    novaListaReceitas.push(receita);
    await AsyncStorage.setItem('receitas', JSON.stringify(novaListaReceitas));
    setReceitas(novaListaReceitas);
  }

  async function editarReceita(receitaAntiga, novosDados) {
    const novaListaReceitas = receitas.map((receita) => {
      if (receita === receitaAntiga) {
        return novosDados;
      } else {
        return receita;
      }
    });

    await AsyncStorage.setItem('receitas', JSON.stringify(novaListaReceitas));
    setReceitas(novaListaReceitas);
  }

  async function excluirReceita(receita) {
    const novaListaReceitas = receitas.filter((r) => r !== receita);
    await AsyncStorage.setItem('receitas', JSON.stringify(novaListaReceitas));
    setReceitas(novaListaReceitas);
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Receitas
      </Text>

      <FlatList
        style={styles.list}
        data={receitas}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={styles.textoCard}>
                  {item?.paciente}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Médico: {item?.medico}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Medicamento: {item?.medicamento}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Posologia: {item?.posologia}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.editButton}
                onPress={() =>
                  navigation.push('FormReceitas', {
                    acao: editarReceita,
                    receita: item,
                  })
                }
              >
                Editar
              </Button>
              <Button
                style={styles.deleteButton}
                onPress={() => {
                  excluirReceita(item);
                }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() =>
          navigation.push('FormReceitas', {
            acao: adicionarReceita,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    marginTop: 100,
    color: '#1A998E',
  },
  list: {
    width: '90%',
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#1A998E',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
  card: {
    marginTop: 15,
    borderColor: '#1A998E',
  },
  textoCard: {
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1A998E',
  },
  editButton: {
    marginRight: 8,
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
  },
});
