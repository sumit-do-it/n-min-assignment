import { FlatList, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import WithSafeArea from "HOCs/WithSafeArea";
import { theme } from "theme";
import ScreenHeader from "components/molecules/ScreenHeader";
import { useStore } from "store/rootStore";
import StarshipCard from "components/molecules/StarshipCard";
import { observer } from "mobx-react";
import Animated, { LinearTransition } from "react-native-reanimated";
import ActionButton from "components/atoms/ActionButton";
import EmptyState from "components/atoms/EmptyState";
import { showSuccessToast } from "utils/toastMessages";

const Cart = () => {
  const [cartStore] = useStore("cartStore");
  const cartItems = cartStore.getCart();

  const onPlaceOrder = () => {
    cartStore.clearCart();
    showSuccessToast("Order placed successfully");
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Cart" />
      <Animated.FlatList
        data={cartItems}
        renderItem={({ item }) => <StarshipCard item={item} />}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.name || index.toString()}
        itemLayoutAnimation={LinearTransition}
        ListEmptyComponent={<EmptyState heading="No items in cart" />}
      />
      {cartItems.length > 0 && (
        <>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceStyle}>Total Price: </Text>
            <Text style={styles.priceText}>AED {cartStore.totalPrice}</Text>
          </View>
          <View style={styles.footer}>
            <ActionButton title="Place Order" onPress={onPlaceOrder} />
          </View>
        </>
      )}
    </View>
  );
};

export default WithSafeArea(observer(Cart), {
  statusBackgroundColor: theme.colors.primary,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  footer: {
    padding: theme.spacing.smd,
    backgroundColor: theme.colors.background,
  },
  totalPriceStyle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium as TextStyle["fontWeight"],
    color: theme.colors.textSecondary,
  },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  priceText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.success,
  },
});
