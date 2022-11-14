import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importar vistas para el Tab
import Login from '../screens/Login';
import Register from '../screens/Register';

// importar Tab Navigator
import Navegador from './Navegador';

const Stack = createNativeStackNavigator();

function StackNavigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Navegador' component={Navegador} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;