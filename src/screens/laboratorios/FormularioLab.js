import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';

export default function FormularioLaboratorios({ navigation, route }) {
  const { acao, laboratorio: laboratorioAntigo } = route.params;

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    endereco: Yup.string().required('Campo obrigatório!'),
    telefone: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório!'),
  });

  function salvar(novoLaboratorio) {
    if (laboratorioAntigo) {
      acao(laboratorioAntigo, novoLaboratorio);
    } else {
      acao(novoLaboratorio);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        {laboratorioAntigo ? 'Editar Laboratório' : 'Adicionar Laboratório'}
      </Text>

      <Formik
        initialValues={{
          nome: laboratorioAntigo ? laboratorioAntigo.nome : '',
          endereco: laboratorioAntigo ? laboratorioAntigo.endereco : '',
          telefone: laboratorioAntigo ? laboratorioAntigo.telefone : '',
          email: laboratorioAntigo ? laboratorioAntigo.email : '',
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
                label='Nome do Laboratório'
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                error={touched.nome && errors.nome ? true : false}
              />
              {touched.nome && errors.nome && (
                <Text style={styles.errorText}>{errors.nome}</Text>
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
                <Text style={styles.errorText}>{errors.endereco}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Telefone'
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                keyboardType='phone-pad'
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                  />
                )}
                error={touched.telefone && errors.telefone ? true : false}
              />
              {touched.telefone && errors.telefone && (
                <Text style={styles.errorText}>{errors.telefone}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='E-mail'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
                error={touched.email && errors.email ? true : false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
