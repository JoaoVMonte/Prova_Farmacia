import { createStackNavigator } from '@react-navigation/stack'
import FormularioReceitas from './FormularioReceitas'
import ListaDeReceitas from './ListaReceita'

const Stack = createStackNavigator()

export default function StackReceitas() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaReceitas'
        >

            <Stack.Screen name='ListaReceitas' component={ListaDeReceitas} />
            <Stack.Screen name='FormReceitas' component={FormularioReceitas} />

        </Stack.Navigator>

    )
}