import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (review: ReviewData) => void;
  playgroundName: string;
}

interface ReviewData {
  rating: number;
  comment: string;
  features: string[];
  photos: string[];
}

export default function ReviewModal({
  visible,
  onClose,
  onSubmit,
  playgroundName,
}: ReviewModalProps) {
  const colorScheme = useColorScheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  const featureOptions = [
    { id: "clean", label: "Clean", icon: "sparkles", color: "#4CAF50" },
    { id: "safe", label: "Safe", icon: "shield", color: "#2196F3" },
    { id: "fun", label: "Fun", icon: "face.smiling", color: "#FFC107" },
    {
      id: "accessible",
      label: "Accessible",
      icon: "figure.roll",
      color: "#9C27B0",
    },
    { id: "quiet", label: "Quiet", icon: "speaker.slash", color: "#607D8B" },
    { id: "shady", label: "Shady", icon: "umbrella", color: "#795548" },
    {
      id: "well-maintained",
      label: "Well Maintained",
      icon: "wrench.and.screwdriver",
      color: "#FF5722",
    },
    { id: "crowded", label: "Crowded", icon: "person.3", color: "#E91E63" },
  ];

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleAddPhoto = () => {
    // In real app, this would open image picker
    Alert.alert("Add Photo", "Photo upload feature coming soon!");
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert(
        "Rating Required",
        "Please select a rating before submitting."
      );
      return;
    }

    if (comment.trim().length < 10) {
      Alert.alert(
        "Comment Required",
        "Please write a comment (at least 10 characters)."
      );
      return;
    }

    const reviewData: ReviewData = {
      rating,
      comment: comment.trim(),
      features: selectedFeatures,
      photos,
    };

    onSubmit(reviewData);
    handleClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setSelectedFeatures([]);
    setPhotos([]);
    onClose();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => handleRatingPress(i + 1)}
        style={styles.starButton}
      >
        <IconSymbol
          name={i < rating ? "star.fill" : "star"}
          size={32}
          color={i < rating ? "#FFD700" : "#E0E0E0"}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <IconSymbol
              name="xmark"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>
            Write a Review
          </ThemedText>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <ThemedText style={styles.submitText}>Post</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Playground Name */}
          <ThemedText type="subtitle" style={styles.playgroundName}>
            {playgroundName}
          </ThemedText>

          {/* Rating Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Rate your experience
            </ThemedText>
            <View style={styles.starsContainer}>{renderStars()}</View>
            <ThemedText style={styles.ratingText}>
              {rating > 0 ? `${rating} out of 5 stars` : "Tap to rate"}
            </ThemedText>
          </View>

          {/* Comment Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Share your experience
            </ThemedText>
            <TextInput
              style={styles.commentInput}
              placeholder="Tell us about your visit... (minimum 10 characters)"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={Colors[colorScheme ?? "light"].icon}
            />
            <ThemedText style={styles.characterCount}>
              {comment.length}/500 characters
            </ThemedText>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              What was great about this playground?
            </ThemedText>
            <View style={styles.featuresGrid}>
              {featureOptions.map((feature) => (
                <TouchableOpacity
                  key={feature.id}
                  style={[
                    styles.featureChip,
                    selectedFeatures.includes(feature.id) &&
                      styles.featureChipActive,
                    { borderColor: feature.color },
                  ]}
                  onPress={() => toggleFeature(feature.id)}
                >
                  <IconSymbol
                    name={feature.icon}
                    size={16}
                    color={
                      selectedFeatures.includes(feature.id)
                        ? "#fff"
                        : feature.color
                    }
                  />
                  <ThemedText
                    style={[
                      styles.featureChipText,
                      selectedFeatures.includes(feature.id) &&
                        styles.featureChipTextActive,
                    ]}
                  >
                    {feature.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Photos Section */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Add Photos (Optional)
            </ThemedText>
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={handleAddPhoto}
            >
              <IconSymbol
                name="camera"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
              <ThemedText style={styles.addPhotoText}>
                Add photos to your review
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Guidelines */}
          <View style={styles.guidelinesSection}>
            <ThemedText type="subtitle" style={styles.guidelinesTitle}>
              Review Guidelines
            </ThemedText>
            <View style={styles.guidelinesList}>
              <View style={styles.guidelineItem}>
                <IconSymbol name="checkmark.circle" size={16} color="#4CAF50" />
                <ThemedText style={styles.guidelineText}>
                  Be honest and constructive
                </ThemedText>
              </View>
              <View style={styles.guidelineItem}>
                <IconSymbol name="checkmark.circle" size={16} color="#4CAF50" />
                <ThemedText style={styles.guidelineText}>
                  Focus on playground features and safety
                </ThemedText>
              </View>
              <View style={styles.guidelineItem}>
                <IconSymbol name="checkmark.circle" size={16} color="#4CAF50" />
                <ThemedText style={styles.guidelineText}>
                  Keep it family-friendly
                </ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
  },
  submitButton: {
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playgroundName: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  commentInput: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  characterCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  featureChipActive: {
    backgroundColor: "#0a7ea4",
  },
  featureChipText: {
    fontSize: 12,
    fontWeight: "500",
  },
  featureChipTextActive: {
    color: "#fff",
  },
  addPhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  addPhotoText: {
    fontSize: 16,
    color: "#666",
  },
  guidelinesSection: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  guidelinesList: {
    gap: 8,
  },
  guidelineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: "#666",
  },
});
