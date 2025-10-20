import { StyleSheet, Text, TextStyle, View } from "react-native";
import React, { useMemo, useState } from "react";
import { theme } from "theme";
import WithSafeArea from "HOCs/WithSafeArea";
import SearchInput from "components/atoms/SearchInput";
import EmptyState from "components/atoms/EmptyState";
import PaginatedList from "components/molecules/PaginatedList";
import { Starship, StarshipsApiResponse } from "types/apis.type";
import { getStarships } from "apis/starships";
import StarshipCard from "components/molecules/StarshipCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [data, setData] = useState<Starship[]>([]);

  const apiParams = useMemo(() => ({ search: searchInput }), [searchInput]);

  const renderItem = ({ item, index }: { item: Starship; index: number }) => {
    return <StarshipCard item={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search</Text>
      <SearchInput
        style={styles.searchInput}
        value={searchInput}
        setValue={setSearchInput}
        placeholder="Search Starships"
      />
      {searchInput.length === 0 ? (
        <EmptyState heading="Search for a starship" />
      ) : (
        <PaginatedList<Starship, StarshipsApiResponse>
          data={data}
          setData={setData}
          apiCall={getStarships}
          apiParams={apiParams}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.contentContainerStyle,
            { paddingBottom: bottomTabBarHeight },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState heading="No data found" />}
        />
      )}
    </View>
  );
};

export default WithSafeArea(Search, {
  statusBackgroundColor: theme.colors.primary,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold as TextStyle["fontWeight"],
    color: theme.colors.text,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  searchInput: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  contentContainerStyle: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    flexGrow: 1,
  },
});
