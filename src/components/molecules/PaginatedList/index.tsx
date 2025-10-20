import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import usePagination from "./usePagination";
import { theme } from "theme";

interface PaginatedListProps<T, R> extends FlatListProps<T> {
  apiCall: (url?: string, params?: Record<string, string>) => Promise<R | null>;
  data: T[];
  setData: (data: T[], extraData?: Partial<R>) => void;
  apiParams?: Record<string, string>;
}

const PaginatedList = <T, R>(props: PaginatedListProps<T, R>) => {
  const { loading, error, loadMore, refresh } = usePagination<T, R>(props);

  if (loading == 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  console.log("render paginated list: ", props.data.length);

  return (
    <FlatList<T>
      {...props}
      keyExtractor={(_, index) => index.toString()} // we should not use index as key
      data={props.data}
      onEndReached={loadMore}
      onRefresh={refresh}
      refreshing={loading === 3}
      onEndReachedThreshold={0.9}
    />
  );
};

export default PaginatedList;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
