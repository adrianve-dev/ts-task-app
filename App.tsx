import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Text, View } from './components/Themed'
import useTheme from './hooks/useTheme';

export default function App() {  
  const theme = useTheme()
  
  return (
      <View style={ styles.container }>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Text>theme color: {theme.color}</Text>
        <Text>theme backgroundColor: {theme.backgroundColor}</Text>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
