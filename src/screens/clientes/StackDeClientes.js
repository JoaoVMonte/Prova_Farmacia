import { createStackNavigator } from '@react-navigation/stack'
import FormularioClientes from './FormularioClientes'
import ListaDeClientes from './ListaClientes'

const Stack = createStackNavigator()

export default function StackClientes() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaClientes'
        >

            <Stack.Screen name='ListaClientes' component={ListaDeClientes} />
            <Stack.Screen name='FormularioClientes' component={FormularioClientes} />

        </Stack.Navigator>

    )
}