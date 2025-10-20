import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import React from "react";
import { theme } from "theme";
import Feather from "@expo/vector-icons/Feather";

interface AddToCartButtonProps {
  value: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  maxValue: number;
  style?: StyleProp<ViewStyle>;
}

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { value, onAddToCart, onRemoveFromCart, maxValue } = props;

  const handleAddToCart = () => {
    if (value < maxValue) {
      onAddToCart();
    }
  };

  if (!value)
    return (
      <Pressable hitSlop={10} style={styles.atcButton} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    );

  return (
    <View style={styles.counterContainer}>
      <Pressable
        hitSlop={4}
        style={styles.counterButton}
        onPress={onRemoveFromCart}
      >
        <Feather name="minus" size={18} color={theme.colors.secondary} />
      </Pressable>
      <Text style={styles.counterText}>{value}</Text>
      <Pressable
        hitSlop={4}
        style={styles.counterButton}
        onPress={handleAddToCart}
      >
        <Feather name="plus" size={18} color={theme.colors.secondary} />
      </Pressable>
    </View>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  atcButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.lineHeight.smd,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.secondary,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.round,
    overflow: "hidden",
  },
  counterText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.secondary,
    width: 20,
    textAlign: "center",
  },
  counterButton: {
    padding: theme.spacing.xs,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
});
