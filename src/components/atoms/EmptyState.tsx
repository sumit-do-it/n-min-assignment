import { Image, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { theme } from "theme";

const EmptyState = ({ heading = "No data found" }: { heading?: string }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/empty_state.webp")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.heading}>{heading}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  image: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.medium as TextStyle["fontWeight"],
    color: theme.colors.textSecondary,
  },
});
