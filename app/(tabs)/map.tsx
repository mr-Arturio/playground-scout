import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock playground data for now (will be replaced with real Firestore data)
const mockPlaygrounds = [
  {
    id: "1",
    name: "Central Park Playground",
    latitude: 40.7829,
    longitude: -73.9654,
    ageRange: "2-12",
    surfaceType: "rubber",
    isFenced: true,
    hasShade: true,
    hasSplashPad: false,
    rating: 4.5,
    features: ["swings", "slides", "climbing"],
    imageUrl:
      "https://via.placeholder.com/300x200/87CEEB/000000?text=Central+Park",
  },
  {
    id: "2",
    name: "Riverside Adventure Park",
    latitude: 40.7589,
    longitude: -73.9851,
    ageRange: "3-10",
    surfaceType: "sand",
    isFenced: false,
    hasShade: false,
    hasSplashPad: true,
    rating: 4.2,
    features: ["water-play", "sandbox", "swings"],
    imageUrl:
      "https://via.placeholder.com/300x200/98FB98/000000?text=Riverside+Park",
  },
  {
    id: "3",
    name: "Toddler Town",
    latitude: 40.7505,
    longitude: -73.9934,
    ageRange: "1-5",
    surfaceType: "rubber",
    isFenced: true,
    hasShade: true,
    hasSplashPad: false,
    rating: 4.8,
    features: ["toddler-swings", "small-slides", "playhouse"],
    imageUrl:
      "https://via.placeholder.com/300x200/FFB6C1/000000?text=Toddler+Town",
  },
];

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const [playgrounds, setPlaygrounds] = useState(mockPlaygrounds);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: "all", label: "All", icon: "map" },
    { id: "fenced", label: "Fenced", icon: "lock.shield" },
    { id: "shade", label: "Shaded", icon: "umbrella" },
    { id: "splash", label: "Splash Pad", icon: "drop.fill" },
    { id: "toddler", label: "Toddler Safe", icon: "baby" },
  ];

  const getFilteredPlaygrounds = () => {
    if (selectedFilter === "all") return playgrounds;

    return playgrounds.filter((playground) => {
      switch (selectedFilter) {
        case "fenced":
          return playground.isFenced;
        case "shade":
          return playground.hasShade;
        case "splash":
          return playground.hasSplashPad;
        case "toddler":
          return (
            playground.ageRange.includes("1") ||
            playground.ageRange.includes("2")
          );
        default:
          return true;
      }
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Discover Playgrounds
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

      {/* Filter Bar */}
      {showFilters && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <IconSymbol
                name={filter.icon}
                size={16}
                color={
                  selectedFilter === filter.id
                    ? "#fff"
                    : Colors[colorScheme ?? "light"].tint
                }
              />
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <IconSymbol
            name="map"
            size={64}
            color={Colors[colorScheme ?? "light"].icon}
          />
          <ThemedText style={styles.mapPlaceholderText}>
            Interactive Map Coming Soon
          </ThemedText>
          <ThemedText style={styles.mapPlaceholderSubtext}>
            {getFilteredPlaygrounds().length} playgrounds found
          </ThemedText>
        </View>
      </View>

      {/* Playground List */}
      <View style={styles.listContainer}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Nearby Playgrounds
        </ThemedText>
        <ScrollView style={styles.playgroundList}>
          {getFilteredPlaygrounds().map((playground) => (
            <TouchableOpacity key={playground.id} style={styles.playgroundCard}>
              <View style={styles.playgroundImage}>
                <IconSymbol
                  name="photo"
                  size={32}
                  color={Colors[colorScheme ?? "light"].icon}
                />
              </View>
              <View style={styles.playgroundInfo}>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.playgroundName}
                >
                  {playground.name}
                </ThemedText>
                <View style={styles.playgroundMeta}>
                  <View style={styles.ratingContainer}>
                    <IconSymbol name="star.fill" size={14} color="#FFD700" />
                    <ThemedText style={styles.rating}>
                      {playground.rating}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.ageRange}>
                    Ages {playground.ageRange}
                  </ThemedText>
                </View>
                <View style={styles.featuresContainer}>
                  {playground.isFenced && (
                    <View style={styles.featureTag}>
                      <IconSymbol
                        name="lock.shield"
                        size={12}
                        color="#4CAF50"
                      />
                      <ThemedText style={styles.featureText}>Fenced</ThemedText>
                    </View>
                  )}
                  {playground.hasShade && (
                    <View style={styles.featureTag}>
                      <IconSymbol name="umbrella" size={12} color="#2196F3" />
                      <ThemedText style={styles.featureText}>Shaded</ThemedText>
                    </View>
                  )}
                  {playground.hasSplashPad && (
                    <View style={styles.featureTag}>
                      <IconSymbol name="drop.fill" size={12} color="#00BCD4" />
                      <ThemedText style={styles.featureText}>
                        Splash Pad
                      </ThemedText>
                    </View>
                  )}
                </View>
              </View>
              <IconSymbol
                name="chevron.right"
                size={20}
                color={Colors[colorScheme ?? "light"].icon}
              />
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
  filterContainer: {
    maxHeight: 60,
    paddingHorizontal: 20,
  },
  filterContent: {
    gap: 12,
    paddingVertical: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterChipActive: {
    backgroundColor: "#0a7ea4",
    borderColor: "#0a7ea4",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
  },
  mapContainer: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  playgroundList: {
    flex: 1,
  },
  playgroundCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playgroundImage: {
    width: 60,
    height: 60,
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
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
    gap: 12,
    marginBottom: 8,
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
  ageRange: {
    fontSize: 14,
    color: "#666",
  },
  featuresContainer: {
    flexDirection: "row",
    gap: 8,
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
});
