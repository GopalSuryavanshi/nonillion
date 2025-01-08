import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const HTMLTextEditor = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          html: `
            <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js"></script>
            <textarea id="mytextarea"></textarea>
            <script>
              tinymce.init({
                selector: '#mytextarea'
              });
            </script>
          `,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1,height:100,
  },
});

export default HTMLTextEditor;
