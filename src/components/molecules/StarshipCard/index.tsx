import { StyleSheet, Text, View, Image, TextStyle } from "react-native";
import React, { memo, useState } from "react";
import { Starship } from "types/apis.type";
import { theme } from "theme";
import AddToCartButton from "components/atoms/AddToCartButton";
import WithCartQuantity from "HOCs/WithCartQuantity";
import { observer } from "mobx-react";

const StarshipCard = ({
  item,
  cartQuantity,
  addToCart,
  removeFromCart,
}: {
  item: Starship;
  index: number;
  cartQuantity: number;
  addToCart: () => void;
  removeFromCart: () => void;
}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: "https://picsum.photos/80" }}
        style={styles.imageStyle}
      />
      <View style={styles.middleContainer}>
        <Text numberOfLines={2} style={styles.nameStyle}>
          {item.name}
        </Text>
        <Text style={styles.costStyle}>
          AED {(Number(item.cost_in_credits) / 10000).toFixed(2)}
        </Text>
      </View>
      <View style={styles.actionButton}>
        <AddToCartButton
          value={cartQuantity}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          maxValue={10}
        />
      </View>
    </View>
  );
};
export default WithCartQuantity(memo(StarshipCard));

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.smd,
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
  },
  nameStyle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.text,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: theme.spacing.xxs,
  },
  costStyle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.success,
  },
  actionButton: {
    justifyContent: "flex-end",
    width: "30%",
    alignItems: "flex-end",
  },
});
