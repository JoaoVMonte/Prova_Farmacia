import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

export default function FormularioClientes({ navigation, route }) {
  const { acao, cliente: clienteAntigo } = route.params;

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório!'),
    telefone: Yup.string().required('Campo obrigatório!'),
    endereco: Yup.string().required('Campo obrigatório!'),
  });

  function salvar(novoCliente) {
    if (clienteAntigo) {
      acao(clienteAntigo, novoCliente);
    } else {
      acao(novoCliente);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        {clienteAntigo ? 'Editar Cliente' : 'Adicionar Cliente'}
      </Text>

      <Formik
        initialValues={{
          nome: clienteAntigo ? clienteAntigo.nome : '',
          cpf: clienteAntigo ? clienteAntigo.cpf : '',
          email: clienteAntigo ? clienteAntigo.email : '',
          telefone: clienteAntigo ? clienteAntigo.telefone : '',
          endereco: clienteAntigo ? clienteAntigo.endereco : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode='outlined'
                label='Nome'
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                error={touched.nome && errors.nome ? true : false}
              />
              {touched.nome && errors.nome && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.nome}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='CPF'
                value={values.cpf}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                render={(props) => <TextInputMask {...props} type={'cpf'} />}
                error={touched.cpf && errors.cpf ? true : false}
              />
              {touched.cpf && errors.cpf && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.cpf}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='E-mail'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? true : false}
              />
              {touched.email && errors.email && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.email}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Telefone'
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                render={(props) => <TextInputMask {...props} type={'cel-phone'} />}
                error={touched.telefone && errors.telefone ? true : false}
              />
              {touched.telefone && errors.telefone && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.telefone}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Endereço'
                value={values.endereco}
                onChangeText={handleChange('endereco')}
                onBlur={handleBlur('endereco')}
                error={touched.endereco && errors.endereco ? true : false}
              />
              {touched.endereco && errors.endereco && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.endereco}
                </Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                mode='contained-tonal'
                onPress={() => navigation.goBack()}
              >
                Voltar
              </Button>

              <Button style={styles.button} mode='contained' onPress={handleSubmit}>
                Salvar
              </Button>
            </View>
          </>
        )}
      </Formik>
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
  inputContainer: {
    width: '90%',
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#1A998E',
  },
});
