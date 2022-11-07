import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// importar vistas para el Tab
import Home from '../screens/Home';
import MiPerfil from '../screens/MiPerfil';

function TabNavigator() {
    const Tab = createBottomTabNavigator();

    return(
        <TabNavigator>
            <Tab.Screen name='Home' component={ Home }/>
            <Tab.Screen name='MiPerfil' component={ MiPerfil }/>
        </TabNavigator>
    )
}

export default TabNavigator;