import { StyleSheet, Text, TextStyle, View } from "react-native";
import React, { useState } from "react";
import { theme } from "theme";
import WithSafeArea from "HOCs/WithSafeArea";
import PaginatedList from "components/molecules/PaginatedList";
import { Starship, StarshipsApiResponse } from "types/apis.type";
import { getStarships } from "apis/starships";
import StarshipCard from "components/molecules/StarshipCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Home = () => {
  const [data, setData] = useState<Starship[]>([]);
  const bottomTabBarHeight = useBottomTabBarHeight();

  const renderItem = ({ item, index }: { item: Starship; index: number }) => {
    return <StarshipCard item={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Starships</Text>
      <PaginatedList<Starship, StarshipsApiResponse>
        data={data}
        setData={setData}
        apiCall={getStarships}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottomTabBarHeight },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WithSafeArea(Home, {
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
  contentContainerStyle: {
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
});
