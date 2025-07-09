import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Mock playground data (will be replaced with Firestore data)
const mockPlaygroundData = {
  "1": {
    id: "1",
    name: "Central Park Playground",
    address: "Central Park, New York, NY",
    latitude: 40.7829,
    longitude: -73.9654,
    ageRange: "2-12",
    surfaceType: "rubber",
    isFenced: true,
    hasShade: true,
    hasSplashPad: false,
    hasRestrooms: true,
    hasParking: true,
    rating: 4.5,
    reviewCount: 127,
    features: ["swings", "slides", "climbing", "monkey-bars"],
    description:
      "A beautiful playground located in the heart of Central Park. Perfect for families with children of all ages.",
    images: [
      "https://via.placeholder.com/400x300/87CEEB/000000?text=Central+Park+1",
      "https://via.placeholder.com/400x300/98FB98/000000?text=Central+Park+2",
      "https://via.placeholder.com/400x300/FFB6C1/000000?text=Central+Park+3",
    ],
    reviews: [
      {
        id: "1",
        user: "Sarah M.",
        rating: 5,
        comment: "Great playground! My kids love the climbing equipment.",
        date: "2024-01-15",
        helpful: 12,
      },
      {
        id: "2",
        user: "Mike R.",
        rating: 4,
        comment: "Nice place but can get crowded on weekends.",
        date: "2024-01-10",
        helpful: 8,
      },
    ],
    hours: "6:00 AM - 10:00 PM",
    phone: "(212) 310-6600",
  },
};

export default function PlaygroundDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [playground, setPlayground] = useState(
    mockPlaygroundData[id as string]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // In real app, fetch playground data from Firestore
    if (id && mockPlaygroundData[id as string]) {
      setPlayground(mockPlaygroundData[id as string]);
    }
  }, [id]);

  if (!playground) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Playground not found</ThemedText>
      </ThemedView>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <IconSymbol
        key={i}
        name={i < rating ? "star.fill" : "star"}
        size={16}
        color={i < rating ? "#FFD700" : "#E0E0E0"}
      />
    ));
  };

  const renderFeatureIcon = (feature: string) => {
    const featureIcons: { [key: string]: string } = {
      swings: "figure.and.child.holdinghands",
      slides: "arrow.down.circle",
      climbing: "figure.climbing",
      "monkey-bars": "figure.gymnastics",
      sandbox: "square.fill",
      "water-play": "drop.fill",
    };
    return featureIcons[feature] || "star";
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol
            name="chevron.left"
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <IconSymbol
            name="square.and.arrow.up"
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: playground.images[selectedImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.ratingBadge}>
              <IconSymbol name="star.fill" size={16} color="#FFD700" />
              <ThemedText style={styles.ratingText}>
                {playground.rating}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Image Thumbnails */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
          contentContainerStyle={styles.thumbnailContent}
        >
          {playground.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                selectedImageIndex === index && styles.thumbnailSelected,
              ]}
              onPress={() => setSelectedImageIndex(index)}
            >
              <Image source={{ uri: image }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Playground Info */}
        <View style={styles.infoContainer}>
          <ThemedText type="title" style={styles.playgroundName}>
            {playground.name}
          </ThemedText>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(playground.rating)}
            </View>
            <ThemedText style={styles.reviewCount}>
              ({playground.reviewCount} reviews)
            </ThemedText>
          </View>

          <View style={styles.addressContainer}>
            <IconSymbol name="location" size={16} color="#666" />
            <ThemedText style={styles.address}>{playground.address}</ThemedText>
          </View>

          <ThemedText style={styles.description}>
            {playground.description}
          </ThemedText>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <IconSymbol name="clock" size={20} color="#666" />
              <ThemedText style={styles.infoText}>
                {playground.hours}
              </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="phone" size={20} color="#666" />
              <ThemedText style={styles.infoText}>
                {playground.phone}
              </ThemedText>
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Features
            </ThemedText>
            <View style={styles.featuresGrid}>
              {playground.features.map((feature) => (
                <View key={feature} style={styles.featureItem}>
                  <IconSymbol
                    name={renderFeatureIcon(feature)}
                    size={24}
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                  <ThemedText style={styles.featureText}>
                    {feature
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Amenities
            </ThemedText>
            <View style={styles.amenitiesContainer}>
              {playground.isFenced && (
                <View style={styles.amenityItem}>
                  <IconSymbol name="lock.shield" size={20} color="#4CAF50" />
                  <ThemedText style={styles.amenityText}>Fenced</ThemedText>
                </View>
              )}
              {playground.hasShade && (
                <View style={styles.amenityItem}>
                  <IconSymbol name="umbrella" size={20} color="#2196F3" />
                  <ThemedText style={styles.amenityText}>Shaded</ThemedText>
                </View>
              )}
              {playground.hasSplashPad && (
                <View style={styles.amenityItem}>
                  <IconSymbol name="drop.fill" size={20} color="#00BCD4" />
                  <ThemedText style={styles.amenityText}>Splash Pad</ThemedText>
                </View>
              )}
              {playground.hasRestrooms && (
                <View style={styles.amenityItem}>
                  <IconSymbol name="toilet" size={20} color="#FF9800" />
                  <ThemedText style={styles.amenityText}>Restrooms</ThemedText>
                </View>
              )}
              {playground.hasParking && (
                <View style={styles.amenityItem}>
                  <IconSymbol name="car" size={20} color="#9C27B0" />
                  <ThemedText style={styles.amenityText}>Parking</ThemedText>
                </View>
              )}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Reviews
              </ThemedText>
              <TouchableOpacity style={styles.addReviewButton}>
                <ThemedText style={styles.addReviewText}>Add Review</ThemedText>
              </TouchableOpacity>
            </View>

            {playground.reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <ThemedText type="defaultSemiBold">{review.user}</ThemedText>
                  <View style={styles.reviewStars}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <ThemedText style={styles.reviewComment}>
                  {review.comment}
                </ThemedText>
                <View style={styles.reviewFooter}>
                  <ThemedText style={styles.reviewDate}>
                    {review.date}
                  </ThemedText>
                  <TouchableOpacity style={styles.helpfulButton}>
                    <IconSymbol name="hand.thumbsup" size={14} color="#666" />
                    <ThemedText style={styles.helpfulText}>
                      Helpful ({review.helpful})
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.directionsButton}>
          <IconSymbol name="location" size={20} color="#fff" />
          <ThemedText style={styles.directionsText}>Get Directions</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <IconSymbol
            name="heart"
            size={20}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "600",
  },
  thumbnailContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  thumbnailContent: {
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbnailSelected: {
    borderColor: "#0a7ea4",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  playgroundName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  reviewCount: {
    color: "#666",
    fontSize: 14,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  quickInfo: {
    gap: 12,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  featureItem: {
    alignItems: "center",
    width: (width - 60) / 3,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    textAlign: "center",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  amenityText: {
    fontSize: 14,
    fontWeight: "500",
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addReviewButton: {
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addReviewText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  reviewCard: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
  },
  reviewComment: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewDate: {
    fontSize: 14,
    color: "#666",
  },
  helpfulButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  helpfulText: {
    fontSize: 14,
    color: "#666",
  },
  actionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    gap: 12,
  },
  directionsButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a7ea4",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  directionsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0a7ea4",
  },
});
