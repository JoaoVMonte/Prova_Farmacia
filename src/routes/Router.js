import { createStackNavigator } from '@react-navigation/stack'
import StackClientes from '../screens/clientes/StackDeClientes'
import StackFuncionarios from '../screens/funcionarios/StackDeFuncionarios'
import StackLaboratorios from '../screens/laboratorios/StackLaboratorio'
import Primeira from '../screens/primeira/Primeira'
import StackReceitas from '../screens/receitas/StackReceitas'
import StackRemedios from '../screens/remedios/StackRemedio'
const Stack = createStackNavigator()

export default function StackFarmacia() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Home'
        >
            <Stack.Screen name='Home' component={Primeira} />
            <Stack.Screen name='Funcionarios' component={StackFuncionarios} />
            <Stack.Screen name='Clientes' component={StackClientes} />
            <Stack.Screen name='Remédios' component={StackRemedios} />
            <Stack.Screen name='Laboratórios' component={StackLaboratorios} />
            <Stack.Screen name='Receitas' component={StackReceitas} />

        </Stack.Navigator>

    )
}