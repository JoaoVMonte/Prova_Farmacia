import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function FormularioReceitas({ navigation, route }) {
  const { acao, receita: receitaAntiga } = route.params;

  const validationSchema = Yup.object().shape({
    paciente: Yup.string().required('Campo obrigatório!'),
    medico: Yup.string().required('Campo obrigatório!'),
    medicamento: Yup.string().required('Campo obrigatório!'),
    posologia: Yup.string().required('Campo obrigatório!'),
  });

  function salvar(novaReceita) {
    if (receitaAntiga) {
      acao(receitaAntiga, novaReceita);
    } else {
      acao(novaReceita);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        {receitaAntiga ? 'Editar Receita' : 'Adicionar Receita'}
      </Text>

      <Formik
        initialValues={{
          paciente: receitaAntiga ? receitaAntiga.paciente : '',
          medico: receitaAntiga ? receitaAntiga.medico : '',
          medicamento: receitaAntiga ? receitaAntiga.medicamento : '',
          posologia: receitaAntiga ? receitaAntiga.posologia : '',
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
                label='Nome do Paciente'
                value={values.paciente}
                onChangeText={handleChange('paciente')}
                onBlur={handleBlur('paciente')}
                error={touched.paciente && errors.paciente ? true : false}
              />
              {touched.paciente && errors.paciente && (
                <Text style={styles.errorText}>{errors.paciente}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Nome do Médico'
                value={values.medico}
                onChangeText={handleChange('medico')}
                onBlur={handleBlur('medico')}
                error={touched.medico && errors.medico ? true : false}
              />
              {touched.medico && errors.medico && (
                <Text style={styles.errorText}>{errors.medico}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Nome do Medicamento'
                value={values.medicamento}
                onChangeText={handleChange('medicamento')}
                onBlur={handleBlur('medicamento')}
                error={touched.medicamento && errors.medicamento ? true : false}
              />
              {touched.medicamento && errors.medicamento && (
                <Text style={styles.errorText}>{errors.medicamento}</Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Posologia'
                value={values.posologia}
                onChangeText={handleChange('posologia')}
                onBlur={handleBlur('posologia')}
                error={touched.posologia && errors.posologia ? true : false}
              />
              {touched.posologia && errors.posologia && (
                <Text style={styles.errorText}>{errors.posologia}</Text>
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
