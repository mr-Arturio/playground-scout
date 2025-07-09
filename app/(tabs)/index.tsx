import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase/config";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [playgroundNames, setPlaygroundNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlaygrounds = async () => {
      try {
        console.log("📦 Fetching playgrounds from Firestore...");
        const snapshot = await getDocs(collection(db, "playgrounds"));
        const names = snapshot.docs.map((doc) => doc.data().name);
        console.log("✅ Data received:", names);
        setPlaygroundNames(names);
      } catch (error) {
        console.error("❌ Firestore fetch failed:", error);
      }
    };

    fetchPlaygrounds();
  }, []);

  const quickActions = [
    {
      title: "Find Nearby",
      subtitle: "Discover playgrounds around you",
      icon: "location.circle.fill",
      color: "#4CAF50",
      onPress: () => router.push("/(tabs)/map"),
    },
    {
      title: "My Favorites",
      subtitle: "12 saved playgrounds",
      icon: "heart.fill",
      color: "#E91E63",
      onPress: () => router.push("/(tabs)/profile"),
    },
    {
      title: "Add Review",
      subtitle: "Share your experience",
      icon: "star.fill",
      color: "#FFC107",
      onPress: () => Alert.alert("Add Review", "Review feature coming soon!"),
    },
    {
      title: "Report Issue",
      subtitle: "Help keep playgrounds safe",
      icon: "exclamationmark.triangle.fill",
      color: "#FF5722",
      onPress: () =>
        Alert.alert("Report Issue", "Issue reporting coming soon!"),
    },
  ];

  const recentPlaygrounds = [
    { name: "Central Park Playground", rating: 4.5, visited: "2 days ago" },
    { name: "Riverside Adventure Park", rating: 4.2, visited: "1 week ago" },
    { name: "Toddler Town", rating: 4.8, visited: "2 weeks ago" },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="map.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Playground Scout!</ThemedText>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Actions
        </ThemedText>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={action.onPress}
            >
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: action.color + "20" },
                ]}
              >
                <IconSymbol name={action.icon} size={24} color={action.color} />
              </View>
              <ThemedText type="defaultSemiBold" style={styles.actionTitle}>
                {action.title}
              </ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                {action.subtitle}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Recent Visits */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Recent Visits
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentPlaygrounds.map((playground, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentCard}
              onPress={() => router.push(`/playground/${index + 1}`)}
            >
              <View style={styles.recentCardHeader}>
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.recentCardTitle}
                >
                  {playground.name}
                </ThemedText>
                <View style={styles.ratingContainer}>
                  <IconSymbol name="star.fill" size={14} color="#FFD700" />
                  <ThemedText style={styles.rating}>
                    {playground.rating}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.visitedText}>
                Visited {playground.visited}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Stats */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Your Stats
        </ThemedText>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              24
            </ThemedText>
            <ThemedText style={styles.statLabel}>
              Playgrounds Visited
            </ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              12
            </ThemedText>
            <ThemedText style={styles.statLabel}>Favorites</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              8
            </ThemedText>
            <ThemedText style={styles.statLabel}>Reviews Posted</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  recentCard: {
    width: 200,
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  recentCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recentCardTitle: {
    fontSize: 14,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "500",
  },
  visitedText: {
    fontSize: 12,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0a7ea4",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
