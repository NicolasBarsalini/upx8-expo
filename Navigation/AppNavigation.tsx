// Navigation/AppNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importações das telas
import Login from '../pages/Login';
import Cadastrar from '../pages/Cadastrar';
import Principal from '../pages/Principal';
import Detalhes from '../pages/Detalhes';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="Cadastrar" 
          component={Cadastrar} 
          options={{ title: 'Cadastrar' }} 
        />
        <Stack.Screen 
          name="Principal" 
          component={Principal} 
          options={{ title: 'Página Principal' }} 
        />
        <Stack.Screen 
          name="Detalhes" 
          component={Detalhes} 
          options={{ title: 'Detalhes' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
