import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "theme";

function WithSafeArea(
  Component: React.ComponentType<any>,
  { statusBackgroundColor }: { statusBackgroundColor?: string } = {}
) {
  return (props: any) => {
    const insets = useSafeAreaInsets();
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        <View
          style={{
            paddingTop: insets.top,
            backgroundColor: statusBackgroundColor,
          }}
        />
        <Component {...props} />
      </View>
    );
  };
}

export default WithSafeArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
