import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Mock search data
const mockPlaygrounds = [
  {
    id: "1",
    name: "Central Park Playground",
    address: "Central Park, New York, NY",
    distance: "0.5 km",
    rating: 4.5,
    ageRange: "2-12",
    features: ["fenced", "shaded", "swings", "slides"],
    isOpen: true,
  },
  {
    id: "2",
    name: "Riverside Adventure Park",
    address: "Riverside Park, New York, NY",
    distance: "1.2 km",
    rating: 4.2,
    ageRange: "3-10",
    features: ["splash-pad", "sandbox", "swings"],
    isOpen: true,
  },
  {
    id: "3",
    name: "Toddler Town",
    address: "Madison Square Park, New York, NY",
    distance: "2.1 km",
    rating: 4.8,
    ageRange: "1-5",
    features: ["fenced", "shaded", "toddler-safe"],
    isOpen: false,
  },
  {
    id: "4",
    name: "Brooklyn Bridge Park Playground",
    address: "Brooklyn Bridge Park, Brooklyn, NY",
    distance: "3.5 km",
    rating: 4.6,
    ageRange: "2-12",
    features: ["water-play", "climbing", "swings"],
    isOpen: true,
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPlaygrounds, setFilteredPlaygrounds] =
    useState(mockPlaygrounds);

  const filterOptions = [
    { id: "fenced", label: "Fenced", icon: "lock.shield", color: "#4CAF50" },
    { id: "shaded", label: "Shaded", icon: "umbrella", color: "#2196F3" },
    {
      id: "splash-pad",
      label: "Splash Pad",
      icon: "drop.fill",
      color: "#00BCD4",
    },
    {
      id: "toddler-safe",
      label: "Toddler Safe",
      icon: "baby",
      color: "#FF9800",
    },
    { id: "water-play", label: "Water Play", icon: "drop", color: "#03A9F4" },
    {
      id: "climbing",
      label: "Climbing",
      icon: "figure.climbing",
      color: "#8BC34A",
    },
    {
      id: "swings",
      label: "Swings",
      icon: "figure.and.child.holdinghands",
      color: "#E91E63",
    },
    {
      id: "slides",
      label: "Slides",
      icon: "arrow.down.circle",
      color: "#9C27B0",
    },
    { id: "sandbox", label: "Sandbox", icon: "square.fill", color: "#795548" },
  ];

  const ageRanges = [
    { id: "1-3", label: "Toddlers (1-3)" },
    { id: "3-5", label: "Preschool (3-5)" },
    { id: "5-8", label: "Early School (5-8)" },
    { id: "8-12", label: "Older Kids (8-12)" },
  ];

  useEffect(() => {
    filterPlaygrounds();
  }, [searchQuery, selectedFilters]);

  const filterPlaygrounds = () => {
    let filtered = mockPlaygrounds;

    // Search by name or address
    if (searchQuery) {
      filtered = filtered.filter(
        (playground) =>
          playground.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playground.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected features
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((playground) =>
        selectedFilters.some((filter) => playground.features.includes(filter))
      );
    }

    setFilteredPlaygrounds(filtered);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery("");
  };

  const getFeatureIcon = (feature: string) => {
    const filter = filterOptions.find((f) => f.id === feature);
    return filter ? filter.icon : "star";
  };

  const getFeatureColor = (feature: string) => {
    const filter = filterOptions.find((f) => f.id === feature);
    return filter ? filter.color : "#666";
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Search Playgrounds
        </ThemedText>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <IconSymbol
            name="slider.horizontal.3"
            size={24}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol
            name="magnifyingglass"
            size={20}
            color={Colors[colorScheme ?? "light"].icon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search playgrounds..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors[colorScheme ?? "light"].icon}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <IconSymbol
                name="xmark.circle.fill"
                size={20}
                color={Colors[colorScheme ?? "light"].icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedFilters.map((filterId) => {
              const filter = filterOptions.find((f) => f.id === filterId);
              return (
                <TouchableOpacity
                  key={filterId}
                  style={[
                    styles.activeFilterChip,
                    { backgroundColor: filter?.color + "20" },
                  ]}
                  onPress={() => toggleFilter(filterId)}
                >
                  <IconSymbol
                    name={filter?.icon || "star"}
                    size={14}
                    color={filter?.color || "#666"}
                  />
                  <ThemedText
                    style={[styles.activeFilterText, { color: filter?.color }]}
                  >
                    {filter?.label}
                  </ThemedText>
                  <IconSymbol
                    name="xmark.circle.fill"
                    size={12}
                    color={filter?.color || "#666"}
                  />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={clearFilters}
            >
              <ThemedText style={styles.clearFiltersText}>Clear All</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <View style={styles.filterPanel}>
          <ThemedText type="subtitle" style={styles.filterPanelTitle}>
            Filter by Features
          </ThemedText>
          <View style={styles.filterGrid}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilters.includes(filter.id) &&
                    styles.filterChipActive,
                  { borderColor: filter.color },
                ]}
                onPress={() => toggleFilter(filter.id)}
              >
                <IconSymbol
                  name={filter.icon}
                  size={16}
                  color={
                    selectedFilters.includes(filter.id) ? "#fff" : filter.color
                  }
                />
                <Text
                  style={[
                    styles.filterChipText,
                    selectedFilters.includes(filter.id) &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <ThemedText type="subtitle" style={styles.resultsTitle}>
            {filteredPlaygrounds.length} Playgrounds Found
          </ThemedText>
          <TouchableOpacity style={styles.sortButton}>
            <IconSymbol name="arrow.up.arrow.down" size={16} color="#666" />
            <ThemedText style={styles.sortText}>Sort</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.resultsList}
          showsVerticalScrollIndicator={false}
        >
          {filteredPlaygrounds.map((playground) => (
            <TouchableOpacity
              key={playground.id}
              style={styles.playgroundCard}
              onPress={() => router.push(`/playground/${playground.id}`)}
            >
              <View style={styles.playgroundHeader}>
                <View style={styles.playgroundInfo}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={styles.playgroundName}
                  >
                    {playground.name}
                  </ThemedText>
                  <View style={styles.playgroundMeta}>
                    <IconSymbol name="location" size={14} color="#666" />
                    <ThemedText style={styles.playgroundAddress}>
                      {playground.address}
                    </ThemedText>
                    <ThemedText style={styles.playgroundDistance}>
                      • {playground.distance}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.playgroundRating}>
                  <View style={styles.ratingContainer}>
                    <IconSymbol name="star.fill" size={14} color="#FFD700" />
                    <ThemedText style={styles.rating}>
                      {playground.rating}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: playground.isOpen
                          ? "#4CAF50"
                          : "#F44336",
                      },
                    ]}
                  >
                    <ThemedText style={styles.statusText}>
                      {playground.isOpen ? "Open" : "Closed"}
                    </ThemedText>
                  </View>
                </View>
              </View>

              <View style={styles.featuresContainer}>
                {playground.features.slice(0, 4).map((feature) => (
                  <View key={feature} style={styles.featureTag}>
                    <IconSymbol
                      name={getFeatureIcon(feature)}
                      size={12}
                      color={getFeatureColor(feature)}
                    />
                    <ThemedText style={styles.featureText}>
                      {feature
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </ThemedText>
                  </View>
                ))}
                {playground.features.length > 4 && (
                  <ThemedText style={styles.moreFeatures}>
                    +{playground.features.length - 4} more
                  </ThemedText>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  activeFiltersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  activeFilterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    fontSize: 12,
    fontWeight: "500",
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F44336",
    borderRadius: 16,
    marginLeft: 8,
  },
  clearFiltersText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  filterPanel: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  filterPanelTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  filterChipActive: {
    backgroundColor: "#0a7ea4",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
  },
  sortText: {
    fontSize: 14,
    color: "#666",
  },
  resultsList: {
    flex: 1,
  },
  playgroundCard: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  playgroundHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  playgroundInfo: {
    flex: 1,
  },
  playgroundName: {
    fontSize: 16,
    marginBottom: 4,
  },
  playgroundMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  playgroundAddress: {
    fontSize: 14,
    color: "#666",
  },
  playgroundDistance: {
    fontSize: 14,
    color: "#666",
  },
  playgroundRating: {
    alignItems: "flex-end",
    gap: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  featureTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
  },
  featureText: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
  moreFeatures: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});
