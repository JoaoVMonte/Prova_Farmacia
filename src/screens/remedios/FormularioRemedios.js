import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';

export default function FormularioRemedios({ navigation, route }) {
  const { acao, remedio: remedioAntigo } = route.params;

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    quantidade: Yup.number().required('Campo obrigatório!').min(0, 'Quantidade inválida'),
    validade: Yup.string().required('Campo obrigatório!'),
  });

  function salvar(novoRemedio) {
    if (remedioAntigo) {
      acao(remedioAntigo, novoRemedio);
    } else {
      acao(novoRemedio);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        {remedioAntigo ? 'Editar Remédio' : 'Adicionar Remédio'}
      </Text>

      <Formik
        initialValues={{
          nome: remedioAntigo ? remedioAntigo.nome : '',
          quantidade: remedioAntigo ? remedioAntigo.quantidade.toString() : '',
          validade: remedioAntigo ? remedioAntigo.validade : '',
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
                label='Nome do Remédio'
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
                label='Quantidade'
                value={values.quantidade}
                onChangeText={handleChange('quantidade')}
                onBlur={handleBlur('quantidade')}
                keyboardType='numeric'
                error={touched.quantidade && errors.quantidade ? true : false}
              />
              {touched.quantidade && errors.quantidade && (
                <Text style={styles.errorText}>{errors.quantidade}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Validade'
                value={values.validade}
                onChangeText={handleChange('validade')}
                onBlur={handleBlur('validade')}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                  />
                )}
                error={touched.validade && errors.validade ? true : false}
              />
              {touched.validade && errors.validade && (
                <Text style={styles.errorText}>{errors.validade}</Text>
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
