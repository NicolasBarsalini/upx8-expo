import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Principal({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Principal</Text>

      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Detalhes')}
      />
      <Button
        title="Sair (Voltar para Login)"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
