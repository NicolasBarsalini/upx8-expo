import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; 
// Se ainda não instalou: npx expo install @react-native-community/checkbox

export default function Cadastrar({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const handleCadastro = () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    if (!aceitouTermos) {
      Alert.alert('Atenção', 'Você precisa aceitar os termos de uso.');
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>Criar Conta</Text>
        <Text style={styles.subtitle}>
          Preencha os campos abaixo para criar sua conta
        </Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {/* Termos */}
        <View style={styles.termosContainer}>
          {Platform.OS === 'web' ? (
            // Fallback para web
            <TouchableOpacity
              onPress={() => setAceitouTermos(!aceitouTermos)}
              style={[
                styles.checkboxWeb,
                aceitouTermos && { backgroundColor: '#64b6ac' },
              ]}
            />
          ) : (
            <CheckBox
              value={aceitouTermos}
              onValueChange={setAceitouTermos}
              tintColors={{ true: '#64b6ac', false: '#888' }}
            />
          )}
          <Text style={styles.termosText}>
            Li e aceito os{' '}
            <Text
              style={styles.linkTermos}
              onPress={() =>
                Alert.alert(
                  'Termos de Uso',
                  'Ao se cadastrar, você concorda em usar o aplicativo de forma responsável, proteger suas credenciais e respeitar as regras da comunidade.'
                )
              }
            >
              Termos de Uso
            </Text>.
          </Text>
        </View>

        {/* Botão Cadastrar */}
        <TouchableOpacity style={styles.buttonGreen} onPress={handleCadastro}>
          <Text style={styles.buttonGreenText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Voltar */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.voltarText}>Já tem conta? Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  form: {
    paddingHorizontal: 30,
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  termosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 8,
  },
  termosText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  linkTermos: {
    color: '#64b6ac',
    textDecorationLine: 'underline',
  },
  checkboxWeb: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonGreen: {
    backgroundColor: '#64b6ac',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonGreenText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  voltarText: {
    fontSize: 14,
    color: '#64b6ac',
    textAlign: 'center',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});
