import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import imagemMedico from './imagem_medico.png';
import imagem from './medico.png';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Primeira({ navigation }) {
  return (
    <View style={styles.principal}>
        
      <Image source={imagem} style={styles.imagem} /> 

        <Text style={styles.texto}>Organize sua farmácia</Text>

        <View style={styles.botoes}>
          <Button
            icon={() => <Icon name="account" size={20} color="#1A998E" />}
            mode="contained"
            onPress={() => navigation.navigate('Funcionarios')}
            style={{ backgroundColor: '#FFFFFF', marginRight: 10 }}
            labelStyle={{ color: '#1A998E' }}  // Cor do texto
          >
            Funcionário
          </Button>

          <Button
            icon={() => <Icon name="flask" size={20} color="#1A998E" />}
            mode="contained"
            onPress={() => navigation.navigate('Laboratórios')}
            style={{ backgroundColor: '#FFFFFF' }}
            labelStyle={{ color: '#1A998E' }}  
          >
            Laboratórios
          </Button>
        </View>

        <View style={styles.botoes}>
          <Button
            icon={() => <Icon name="pill" size={20} color="#1A998E" />}
            mode="contained"
            onPress={() => navigation.navigate('Remédios')}
            style={{ backgroundColor: '#FFFFFF', marginRight: 10 }}
            labelStyle={{ color: '#1A998E' }}  
          >
            Remédios
          </Button>

          <Button
            icon={() => <Icon name="file-document" size={20} color="#1A998E" />}
            mode="contained"
            onPress={() => navigation.navigate('Receitas')}
            style={{ backgroundColor: '#FFFFFF' }}
            labelStyle={{ color: '#1A998E' }}  
          >
            Receitas
          </Button>
        </View>

        <View style={styles.botoes}>
          <Button
            icon={() => <Icon name="account-group" size={20} color="#1A998E" />}
            mode="contained"
            onPress={() => navigation.navigate('Clientes')}
            style={{ backgroundColor: '#FFFFFF' }}
            labelStyle={{ color: '#1A998E' }}  
          >
            Clientes
          </Button>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    principal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A998E',
      },
    imagem: {
        width: 300,  
        height: 400, 
    },
    texto: {
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
      color: '#FFFFFF',
    },
    botoes: {
      flexDirection: 'row',
      marginTop: 10,
    },
  });