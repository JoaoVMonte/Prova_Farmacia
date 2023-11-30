import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import StackFarmacia from './src/routes/Router';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackFarmacia />
      </NavigationContainer>
    </PaperProvider>
  );
}

