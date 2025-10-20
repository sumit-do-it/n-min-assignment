import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import React, { memo } from "react";
import { theme } from "theme";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

interface ScreenHeaderProps {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  leftAction?: () => void;
  rightAction?: () => void;
}

const ScreenHeader = ({
  title,
  left = <Feather name="arrow-left" size={24} color={theme.colors.text} />,
  leftAction,
  right = null,
  rightAction,
}: ScreenHeaderProps) => {
  const navigation = useNavigation();

  const handleLeftAction = () => {
    if (leftAction) {
      leftAction();
    } else {
      navigation.goBack();
    }
  };

  const handleRightAction = () => {
    if (rightAction) {
      rightAction();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLeftAction}>{left}</Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={handleRightAction}>{right}</Pressable>
    </View>
  );
};

export default memo(ScreenHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.smd,
    gap: theme.spacing.smd,
    backgroundColor: theme.colors.primary,
  },
  title: {
    flex: 1,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.text,
  },
});
