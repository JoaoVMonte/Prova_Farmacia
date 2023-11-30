import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';

export default function ListaDeClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    loadClientes();
  }, [clientes]);

  async function loadClientes() {
    const response = await AsyncStorage.getItem('clientes');
    const clientesStorage = response ? JSON.parse(response) : [];
    setClientes(clientesStorage);
  }

  async function adicionarCliente(cliente) {
    let novaListaClientes = clientes;
    novaListaClientes.push(cliente);
    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    setClientes(novaListaClientes);
  }

  async function editarCliente(clienteAntigo, novosDados) {
    const novaListaClientes = clientes.map((cliente) => {
      if (cliente === clienteAntigo) {
        return novosDados;
      } else {
        return cliente;
      }
    });

    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    setClientes(novaListaClientes);
  }

  async function excluirCliente(cliente) {
    const novaListaClientes = clientes.filter((c) => c !== cliente);
    await AsyncStorage.setItem('clientes', JSON.stringify(novaListaClientes));
    setClientes(novaListaClientes);
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Clientes
      </Text>

      <FlatList
        style={styles.list}
        data={clientes}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={styles.textoCard}>
                  {item?.nome}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  CPF: {item?.cpf}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  E-mail: {item?.email}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Telefone: {item?.telefone}
                </Text>
                <Text variant='bodyLarge' style={styles.textoCard}>
                  Endereço: {item?.endereco}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                style={styles.editButton}
                onPress={() =>
                  navigation.push('FormularioClientes', {
                    acao: editarCliente,
                    cliente: item,
                  })
                }
              >
                Editar
              </Button>
              <Button style={styles.deleteButton} onPress={() => excluirCliente(item)}>
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
          navigation.push('FormularioClientes', {
            acao: adicionarCliente,
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
