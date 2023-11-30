import { createStackNavigator } from '@react-navigation/stack'
import FormularioRemedios from './FormularioRemedios'
import ListaDeRemedios from './ListaRemedio'

const Stack = createStackNavigator()

export default function StackRemedios() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaRemedios'
        >

            <Stack.Screen name='ListaRemedios' component={ListaDeRemedios} />
            <Stack.Screen name='FormularioRemedios' component={FormularioRemedios} />

        </Stack.Navigator>

    )
}