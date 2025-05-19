import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  console.log("✅ index.tsx loaded!");

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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! It's a TEST</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Playgrounds from Firestore:</ThemedText>
        {playgroundNames.length > 0 ? (
          playgroundNames.map((name, idx) => (
            <ThemedText key={idx} >
              {`• ${name}`}
            </ThemedText>
          ))
        ) : (
          <ThemedText>No playgrounds found.</ThemedText>
        )}
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
