import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import * as Clipboard from 'expo-clipboard';

export const ShareMarkdownMenu = ({ markdown }: { markdown: string }) => {
  const onCopyToClipboardPress = async () => {
    await Clipboard.setStringAsync(markdown);
    Alert.alert("Copied to clipboard");
  }

  const onExportAsPDFPress = () => {
    Alert.alert("Export as PDF");
  }

  return (
    <>
      <Separator />

      <View style={styles.container}>
        <Button onPress={onCopyToClipboardPress} text="Copy to Clipboard" style={styles.btnStyle} />
        {/*
        <Button onPress={onExportAsPDFPress} text="Export as PDF" style={styles.btnStyle} />
        */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10
  },
  btnStyle: {
    width: "100%",
  }
});
