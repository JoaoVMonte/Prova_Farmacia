import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';

export default function ListaDeLaboratorios({ navigation }) {
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    loadLaboratorios();
  }, [laboratorios]);

  async function loadLaboratorios() {
    const response = await AsyncStorage.getItem('laboratorios');
    const laboratoriosStorage = response ? JSON.parse(response) : [];
    setLaboratorios(laboratoriosStorage);
  }

  async function adicionarLaboratorio(laboratorio) {
    let novaListaLaboratorios = laboratorios;
    novaListaLaboratorios.push(laboratorio);
    await AsyncStorage.setItem('laboratorios', JSON.stringify(novaListaLaboratorios));
    setLaboratorios(novaListaLaboratorios);
  }

  async function editarLaboratorio(laboratorioAntigo, novosDados) {
    const novaListaLaboratorios = laboratorios.map((laboratorio) => {
      if (laboratorio === laboratorioAntigo) {
        return novosDados;
      } else {
        return laboratorio;
      }
    });

    await AsyncStorage.setItem('laboratorios', JSON.stringify(novaListaLaboratorios));
    setLaboratorios(novaListaLaboratorios);
  }

  async function excluirLaboratorio(laboratorio) {
    const novaListaLaboratorios = laboratorios.filter((l) => l !== laboratorio);
    await AsyncStorage.setItem('laboratorios', JSON.stringify(novaListaLaboratorios));
    setLaboratorios(novaListaLaboratorios);
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Laboratórios
      </Text>

      <FlatList
        style={styles.list}
        data={laboratorios}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={styles.textoCard}>
                  {item?.nome}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Endereço: {item?.endereco}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Telefone: {item?.telefone}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  E-mail: {item?.email}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.editButton}
                onPress={() =>
                  navigation.push('FormLab', {
                    acao: editarLaboratorio,
                    laboratorio: item,
                  })
                }
              >
                Editar
              </Button>
              <Button
                style={styles.deleteButton}
                onPress={() => {
                  excluirLaboratorio(item);
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
          navigation.push('FormLab', {
            acao: adicionarLaboratorio,
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
