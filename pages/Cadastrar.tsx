import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Cadastrar({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>

      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Ir para Principal"
        onPress={() => navigation.navigate('Principal')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
