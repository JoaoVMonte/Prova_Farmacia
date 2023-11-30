import { createStackNavigator } from '@react-navigation/stack'
import FormularioLaboratorios from './FormularioLab'
import ListaDeLaboratorios from './ListaLab'

const Stack = createStackNavigator()

export default function StackLaboratorios() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaLab'
        >

            <Stack.Screen name='ListaLab' component={ListaDeLaboratorios} />
            <Stack.Screen name='FormLab' component={FormularioLaboratorios} />

        </Stack.Navigator>

    )
}