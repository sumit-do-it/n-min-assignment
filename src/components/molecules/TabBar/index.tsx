import { View, Text, StyleSheet, TextStyle } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import { theme } from "theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Icons = {
  home: "home",
  search: "search",
  cart: "shopping-cart",
};

function TabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const insets = useSafeAreaInsets();

  const renderBackground = (isFocused: boolean) => {
    if (!isFocused) return null;
    return (
      <Animated.View
        style={[styles.focusedItemBackground]}
        entering={FadeInLeft.duration(100)}
        exiting={FadeOutLeft.duration(100)}
      />
    );
  };

  return (
    <View style={[styles.container, { marginBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const navigateTo = options.navigateTo;

        const isFocused = state.index === index;

        const onPress = () => {
          if (navigateTo) {
            navigation.navigate(navigateTo as string);
            return;
          }
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.itemStyle}
          >
            {renderBackground(isFocused)}
            <FontAwesome5
              name={Icons[route.name.toLowerCase() as keyof typeof Icons]}
              size={16}
              color={isFocused ? colors.primary : colors.text}
            />
            <Text
              style={[
                { color: isFocused ? colors.primary : colors.text },
                styles.itemText,
              ]}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

export default TabBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: theme.spacing.sm,
    left: 0,
    right: 0,
    height: 56,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.round,
    overflow: "hidden",
    borderTopWidth: 0,
    flexDirection: "row",
    backgroundColor: theme.colors.background,

    // Add shadow for both Android (elevation) and iOS (shadow properties)
    elevation: 2, // Android shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xxs,
  },
  itemText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    lineHeight: theme.typography.lineHeight.xs,
  },
  focusedItemBackground: {
    position: "absolute",
    top: theme.spacing.xs,
    bottom: theme.spacing.xs,
    left: theme.spacing.xs,
    right: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    zIndex: -1,
  },
});
