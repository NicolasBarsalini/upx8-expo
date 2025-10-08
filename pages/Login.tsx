import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }: any) {
  // ---------- GOOGLE AUTH ----------
  const clientId =
    Platform.OS === 'android'
      ? 'SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com'
      : Platform.OS === 'ios'
      ? 'SEU_IOS_CLIENT_ID.apps.googleusercontent.com'
      : 'SEU_WEB_CLIENT_ID.apps.googleusercontent.com';

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      Alert.alert('Login com Google', `Token: ${authentication?.accessToken}`);
      // Enviar token ao seu backend, se precisar
    }
  }, [response]);

  // ---------- RENDERIZAÇÃO ----------
  return (
    <View style={styles.container}>
      {/* Logo e textos */}
      <View style={styles.header}>
        <Text style={styles.logo}>ArchiViewAR</Text>
        <Text style={styles.subtitle}>
          Visualize seu futuro lar{"\n"}em realidade aumentada
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.buttons}>
        {/* GOOGLE */}
        <TouchableOpacity
          style={styles.buttonWhite}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Text style={styles.buttonWhiteText}>Continuar com Google</Text>
        </TouchableOpacity>

        {/* APPLE */}
        {Platform.OS === 'ios' ? (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={6}
            style={{ width: '100%', height: 48 }}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                Alert.alert(
                  'Login com Apple',
                  JSON.stringify(credential, null, 2)
                );
              } catch (e: any) {
                if (e.code === 'ERR_CANCELED') {
                  console.log('Login Apple cancelado');
                } else {
                  console.error(e);
                }
              }
            }}
          />
        ) : (
          <TouchableOpacity style={styles.buttonWhiteDisabled}>
            <Text style={styles.buttonWhiteText}>Continuar com Apple</Text>
          </TouchableOpacity>
        )}

        {/* CRIAR CONTA */}
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate('Cadastrar')}
        >
          <Text style={styles.buttonOutlineText}>Criar Conta</Text>
        </TouchableOpacity>

        {/* EXPLORAR */}
        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={() => navigation.navigate('Principal')}
        >
          <Text style={styles.buttonGreenText}>Explorar Agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',          // fundo claro, sem imagem
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  header: {
    marginTop: 80,
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  buttons: {
    paddingHorizontal: 30,
    gap: 14,
    marginBottom: 40,
  },
  buttonWhite: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 1,                         // leve sombra no Android
  },
  buttonWhiteDisabled: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonWhiteText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonOutlineText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  buttonGreen: {
    backgroundColor: '#64b6ac',           // verde do botão "Explorar Agora"
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonGreenText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
