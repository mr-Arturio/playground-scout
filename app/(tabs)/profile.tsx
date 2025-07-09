import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    colorScheme === "dark"
  );

  const profileSections = [
    {
      title: "Account",
      items: [
        {
          icon: "person.circle",
          title: "Edit Profile",
          subtitle: "Update your information",
          action: "navigate",
          color: "#4CAF50",
        },
        {
          icon: "heart",
          title: "My Favorites",
          subtitle: "12 saved playgrounds",
          action: "navigate",
          color: "#E91E63",
        },
        {
          icon: "photo",
          title: "My Reviews",
          subtitle: "8 reviews posted",
          action: "navigate",
          color: "#2196F3",
        },
        {
          icon: "location",
          title: "Visited Playgrounds",
          subtitle: "24 playgrounds visited",
          action: "navigate",
          color: "#FF9800",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: "bell",
          title: "Notifications",
          subtitle: "Get updates about playgrounds",
          action: "toggle",
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
          color: "#9C27B0",
        },
        {
          icon: "location.circle",
          title: "Location Services",
          subtitle: "Find playgrounds near you",
          action: "toggle",
          value: locationEnabled,
          onToggle: setLocationEnabled,
          color: "#607D8B",
        },
        {
          icon: "moon",
          title: "Dark Mode",
          subtitle: "Switch between themes",
          action: "toggle",
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
          color: "#795548",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "questionmark.circle",
          title: "Help & FAQ",
          subtitle: "Get help and answers",
          action: "navigate",
          color: "#FF5722",
        },
        {
          icon: "envelope",
          title: "Contact Us",
          subtitle: "Send us feedback",
          action: "navigate",
          color: "#00BCD4",
        },
        {
          icon: "star",
          title: "Rate App",
          subtitle: "Rate us on App Store",
          action: "navigate",
          color: "#FFC107",
        },
        {
          icon: "info.circle",
          title: "About",
          subtitle: "Version 1.0.0",
          action: "navigate",
          color: "#757575",
        },
      ],
    },
  ];

  const handleAction = (item: any) => {
    if (item.action === "navigate") {
      // Navigate to respective screen
      Alert.alert("Navigation", `Navigate to ${item.title}`);
    }
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          // Handle sign out logic
          Alert.alert("Signed Out", "You have been signed out successfully.");
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Profile
        </ThemedText>
        <TouchableOpacity style={styles.settingsButton}>
          <IconSymbol
            name="gearshape"
            size={24}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <IconSymbol
                name="person.fill"
                size={48}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <IconSymbol name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <ThemedText type="title" style={styles.userName}>
              Sarah Johnson
            </ThemedText>
            <ThemedText style={styles.userEmail}>
              sarah.johnson@email.com
            </ThemedText>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                  24
                </ThemedText>
                <ThemedText style={styles.statLabel}>Visited</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                  12
                </ThemedText>
                <ThemedText style={styles.statLabel}>Favorites</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText type="defaultSemiBold" style={styles.statNumber}>
                  8
                </ThemedText>
                <ThemedText style={styles.statLabel}>Reviews</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              {section.title}
            </ThemedText>

            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.menuItem}
                onPress={() => handleAction(item)}
                disabled={item.action === "toggle"}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: item.color + "20" },
                    ]}
                  >
                    <IconSymbol name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={styles.menuItemContent}>
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.menuItemTitle}
                    >
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.menuItemSubtitle}>
                      {item.subtitle}
                    </ThemedText>
                  </View>
                </View>

                {item.action === "toggle" ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: "#E0E0E0", true: item.color }}
                    thumbColor={item.value ? "#fff" : "#f4f3f4"}
                  />
                ) : (
                  <IconSymbol
                    name="chevron.right"
                    size={20}
                    color={Colors[colorScheme ?? "light"].icon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <IconSymbol
            name="rectangle.portrait.and.arrow.right"
            size={20}
            color="#FF5722"
          />
          <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0a7ea4",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F8F9FA",
    marginHorizontal: 20,
    marginBottom: 1,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    gap: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5722",
  },
  bottomSpacing: {
    height: 100,
  },
});
