import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, FAB, TextInput, Text } from 'react-native-paper'

export default function ListaDeFuncionarios({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([])

  useEffect(() => {
    loadFuncionarios()
  }, [funcionarios])

  async function loadFuncionarios() {
    const response = await AsyncStorage.getItem('funcionarios')
    const funcionariosStorage = response ? JSON.parse(response) : []
    setFuncionarios(funcionariosStorage)
  }

  async function adicionarFuncionario(funcionario) {
    let novaListaFuncionarios = funcionarios
    novaListaFuncionarios.push(funcionario)
    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios))
    setFuncionarios(novaListaFuncionarios)
  }

  async function editarFuncionario(funcionarioAntigo, novosDados) {
    const novaListaFuncionarios = funcionarios.map(funcionario => {
      if (funcionario === funcionarioAntigo) {
        return novosDados
      } else {
        return funcionario
      }
    })

    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios))
    setFuncionarios(novaListaFuncionarios)
  }

  async function excluirFuncionario(funcionario) {
    const novaListaFuncionarios = funcionarios.filter(f => f !== funcionario)
    await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios))
    setFuncionarios(novaListaFuncionarios)
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        Lista de Funcionários
      </Text>

      <FlatList
        style={styles.list}
        data={funcionarios}
        renderItem={({ item }) => (
          <Card mode='outlined' style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium' style={styles.textoCard}>{item?.nome}</Text>
                <Text variant='bodyLarge' style={styles.textoCard}>CPF: {item?.cpf}</Text>
                <Text variant='bodyLarge' style={styles.textoCard}>Cargo: {item?.cargo}</Text>
                <Text variant='bodyLarge' style={styles.textoCard}>Data de Nascimento: {item?.dataNascimento}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button style={styles.editButton} onPress={() => navigation.push('FormularioFunc', { acao: editarFuncionario, funcionario: item })}>
                Editar
              </Button>
              <Button style={styles.deleteButton} onPress={() => { excluirFuncionario(item) }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormularioFunc', { acao: adicionarFuncionario })}
      />
    </View>
  )
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
    color: "#fff"
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
})
