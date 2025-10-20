import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { theme } from "theme";
import Feather from "@expo/vector-icons/Feather";
import { debounce } from "utils/methods";

interface SearchInputProps {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

const SearchInput = (props: SearchInputProps) => {
  const ref = useRef<TextInput>(null);
  const { value, setValue, placeholder, style } = props;
  const [currentValue, setCurrentValue] = useState(value);
  const debouncedSetValue = useCallback(debounce(setValue, 500), []);

  const onChangeText = (text: string) => {
    setCurrentValue(text);
    debouncedSetValue(text);
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => ref.current?.focus()}
    >
      <Feather name="search" size={24} color={theme.colors.border} />
      <TextInput
        ref={ref}
        value={currentValue}
        onChangeText={onChangeText}
        placeholder={placeholder ?? "Search"}
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        autoFocus
      />
    </Pressable>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium as TextStyle["fontWeight"],
    color: theme.colors.text,
    padding: 0,
    margin: 0,
  },
});
