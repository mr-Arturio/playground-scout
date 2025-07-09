
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ExploreScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const featuredPlaygrounds = [
    {
      id: '1',
      name: 'Central Park Playground',
      image: 'https://via.placeholder.com/300x200/87CEEB/000000?text=Central+Park',
      rating: 4.5,
      description: 'A beautiful playground in the heart of Central Park',
      features: ['Fenced', 'Shaded', 'Swings', 'Slides']
    },
    {
      id: '2',
      name: 'Riverside Adventure Park',
      image: 'https://via.placeholder.com/300x200/98FB98/000000?text=Riverside+Park',
      rating: 4.2,
      description: 'Adventure-themed playground with water features',
      features: ['Splash Pad', 'Climbing', 'Water Play']
    },
    {
      id: '3',
      name: 'Toddler Town',
      image: 'https://via.placeholder.com/300x200/FFB6C1/000000?text=Toddler+Town',
      rating: 4.8,
      description: 'Perfect for little ones with age-appropriate equipment',
      features: ['Toddler Safe', 'Fenced', 'Small Equipment']
    }
  ];

  const playgroundCategories = [
    {
      title: 'Best for Toddlers',
      icon: 'baby',
      color: '#FFB6C1',
      count: 12
    },
    {
      title: 'Water Play',
      icon: 'drop.fill',
      color: '#87CEEB',
      count: 8
    },
    {
      title: 'Adventure Playgrounds',
      icon: 'figure.climbing',
      color: '#98FB98',
      count: 15
    },
    {
      title: 'Quiet & Peaceful',
      icon: 'speaker.slash',
      color: '#DDA0DD',
      count: 6
    }
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="map.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Playgrounds</ThemedText>
      </ThemedView>

      {/* Featured Playgrounds */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Featured Playgrounds
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredPlaygrounds.map((playground) => (
            <TouchableOpacity
              key={playground.id}
              style={styles.featuredCard}
              onPress={() => router.push(`/playground/${playground.id}`)}
            >
              <View style={styles.featuredImage}>
                <IconSymbol name="photo" size={32} color="#666" />
              </View>
              <View style={styles.featuredContent}>
                <ThemedText type="defaultSemiBold" style={styles.featuredTitle}>
                  {playground.name}
                </ThemedText>
                <View style={styles.ratingContainer}>
                  <IconSymbol name="star.fill" size={14} color="#FFD700" />
                  <ThemedText style={styles.rating}>{playground.rating}</ThemedText>
                </View>
                <ThemedText style={styles.featuredDescription}>
                  {playground.description}
                </ThemedText>
                <View style={styles.featuresContainer}>
                  {playground.features.slice(0, 2).map((feature, index) => (
                    <View key={index} style={styles.featureTag}>
                      <ThemedText style={styles.featureText}>{feature}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Categories */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Browse by Category
        </ThemedText>
        <View style={styles.categoriesGrid}>
          {playgroundCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => router.push('/(tabs)/search')}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <IconSymbol 
                  name={category.icon} 
                  size={32} 
                  color={category.color} 
                />
              </View>
              <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
                {category.title}
              </ThemedText>
              <ThemedText style={styles.categoryCount}>
                {category.count} playgrounds
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Tips & Guides */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Playground Tips & Guides
        </ThemedText>
        <Collapsible title="How to Choose the Right Playground">
          <ThemedText>
            Consider your child's age, interests, and safety needs when selecting a playground.
            Look for age-appropriate equipment, proper surfacing, and safety features.
          </ThemedText>
        </Collapsible>
        <Collapsible title="Playground Safety Checklist">
          <ThemedText>
            • Check for broken equipment{'\n'}
            • Ensure proper surfacing{'\n'}
            • Look for age-appropriate zones{'\n'}
            • Verify fencing and gates{'\n'}
            • Check for shade and water access
          </ThemedText>
        </Collapsible>
        <Collapsible title="What to Bring">
          <ThemedText>
            • Sunscreen and hats{'\n'}
            • Water bottles{'\n'}
            • Change of clothes{'\n'}
            • Snacks{'\n'}
            • First aid kit
          </ThemedText>
        </Collapsible>
      </ThemedView>

      {/* Community Features */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Community Features
        </ThemedText>
        <View style={styles.communityFeatures}>
          <TouchableOpacity style={styles.communityCard}>
            <IconSymbol name="camera" size={24} color={Colors[colorScheme ?? 'light'].tint} />
            <ThemedText type="defaultSemiBold">Share Photos</ThemedText>
            <ThemedText style={styles.communityDescription}>
              Upload photos of playgrounds you visit
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityCard}>
            <IconSymbol name="star" size={24} color={Colors[colorScheme ?? 'light'].tint} />
            <ThemedText type="defaultSemiBold">Write Reviews</ThemedText>
            <ThemedText style={styles.communityDescription}>
              Help other parents with your experiences
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityCard}>
            <IconSymbol name="exclamationmark.triangle" size={24} color={Colors[colorScheme ?? 'light'].tint} />
            <ThemedText type="defaultSemiBold">Report Issues</ThemedText>
            <ThemedText style={styles.communityDescription}>
              Keep playgrounds safe for everyone
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    height: 120,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  communityFeatures: {
    gap: 12,
  },
  communityCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  communityDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
