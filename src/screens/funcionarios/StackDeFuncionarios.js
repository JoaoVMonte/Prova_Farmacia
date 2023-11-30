import { createStackNavigator } from '@react-navigation/stack'
import FormularioFuncionarios from './FormularioFuncionarios'
import ListaDeFuncionarios from './ListaFuncionarios'

const Stack = createStackNavigator()

export default function StackFuncionarios() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaFun'
        >

            <Stack.Screen name='ListaFun' component={ListaDeFuncionarios} />
            <Stack.Screen name='FormularioFunc' component={FormularioFuncionarios} />

        </Stack.Navigator>

    )
}