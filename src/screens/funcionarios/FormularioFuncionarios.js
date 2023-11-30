import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import * as Yup from 'yup'

export default function FormularioFuncionarios({ navigation, route }) {
  const { acao, funcionario: funcionarioAntigo } = route.params

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    cargo: Yup.string().required('Campo obrigatório!'),
    dataNascimento: Yup.string().required('Campo obrigatório!'),
  })

  function salvar(novoFuncionario) {
    if (funcionarioAntigo) {
      acao(funcionarioAntigo, novoFuncionario)
    } else {
      acao(novoFuncionario)
    }

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title}>
        {funcionarioAntigo ? 'Editar Funcionário' : 'Adicionar Funcionário'}
      </Text>

      <Formik
        initialValues={{
          nome: funcionarioAntigo ? funcionarioAntigo.nome : '',
          cpf: funcionarioAntigo ? funcionarioAntigo.cpf : '',
          cargo: funcionarioAntigo ? funcionarioAntigo.cargo : '',
          dataNascimento: funcionarioAntigo ? funcionarioAntigo.dataNascimento : '',
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
                label='Cargo'
                value={values.cargo}
                onChangeText={handleChange('cargo')}
                onBlur={handleBlur('cargo')}
                error={touched.cargo && errors.cargo ? true : false}
              />
              {touched.cargo && errors.cargo && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.cargo}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode='outlined'
                label='Data de Nascimento'
                value={values.dataNascimento}
                onChangeText={handleChange('dataNascimento')}
                onBlur={handleBlur('dataNascimento')}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                  />
                )}
                error={touched.dataNascimento && errors.dataNascimento ? true : false}
              />
              {touched.dataNascimento && errors.dataNascimento && (
                <Text style={{ color: 'red', textAlign: 'center' }}>
                  {errors.dataNascimento}
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
})
