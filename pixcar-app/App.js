import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// importar vistas
import MiPerfil from './src/screens/MiPerfil';

export default function App() {
  return (

      <MiPerfil />
   
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
