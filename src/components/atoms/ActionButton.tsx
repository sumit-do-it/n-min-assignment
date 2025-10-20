import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import { theme } from "theme";

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ActionButton = (props: ActionButtonProps) => {
  return (
    <Pressable style={[styles.container, props.style]} onPress={props.onPress}>
      <Text style={styles.titleStyle}>{props.title}</Text>
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  titleStyle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.secondary,
  },
});
