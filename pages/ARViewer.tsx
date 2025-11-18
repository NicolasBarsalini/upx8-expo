import React from "react";
import { View, ActivityIndicator, StyleSheet, Linking } from "react-native";
import { WebView } from "react-native-webview";

export default function ARViewer({ route }: any) {
  const { url } = route.params;

  const handleNav = (event: any) => {
    const nextUrl = event.url;

    // Scene Viewer (Android)
    if (nextUrl.startsWith("intent://")) {
      Linking.openURL(nextUrl).catch(() => {});
      return false;
    }

    // Quick Look (iOS)
    if (nextUrl.endsWith(".usdz")) {
      Linking.openURL(nextUrl).catch(() => {});
      return false;
    }

    return true;
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}

        onShouldStartLoadWithRequest={handleNav}

        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs

        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="always"
        androidHardwareAccelerationDisabled={false}

        injectedJavaScriptBeforeContentLoaded={`window.customElements;`}

        startInLoadingState
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#2E8376" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
