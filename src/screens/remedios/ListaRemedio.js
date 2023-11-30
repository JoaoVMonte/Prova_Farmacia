import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';

export default function ListaDeRemedios({ navigation }) {
  const [remedios, setRemedios] = useState([]);

  useEffect(() => {
    loadRemedios();
  }, [remedios]);

  async function loadRemedios() {
    const response = await AsyncStorage.getItem('remedios');
    const remediosStorage = response ? JSON.parse(response) : [];
    setRemedios(remediosStorage);
  }

  async function adicionarRemedio(remedio) {
    let novaListaRemedios = remedios;
    novaListaRemedios.push(remedio);
    await AsyncStorage.setItem('remedios', JSON.stringify(novaListaRemedios));
    setRemedios(novaListaRemedios);
  }

  async function editarRemedio(remedioAntigo, novosDados) {
    const novaListaRemedios = remedios.map((remedio) => {
      if (remedio === remedioAntigo) {
        return novosDados;
      } else {
        return remedio;
      }
    });

    await AsyncStorage.setItem('remedios', JSON.stringify(novaListaRemedios));
    setRemedios(novaListaRemedios);
  }

  async function excluirRemedio(remedio) {
    const novaListaRemedios = remedios.filter((r) => r !== remedio);
    await AsyncStorage.setItem('remedios', JSON.stringify(novaListaRemedios));
    setRemedios(novaListaRemedios);
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Remédios
      </Text>

      <FlatList
        style={styles.list}
        data={remedios}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={styles.textoCard}>
                  {item?.nome}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Quantidade: {item?.quantidade}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Validade: {item?.validade}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.editButton}
                onPress={() =>
                  navigation.push('FormularioRemedios', {
                    acao: editarRemedio,
                    remedio: item,
                  })
                }
              >
                Editar
              </Button>
              <Button
                style={styles.deleteButton}
                onPress={() => {
                  excluirRemedio(item);
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
          navigation.push('FormularioRemedios', {
            acao: adicionarRemedio,
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
