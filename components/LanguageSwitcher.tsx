import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";

export const LanguageSwitcher = () => {
  const { setLanguage, language } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setLanguage("en")}>
        <Text style={language === "en" ? styles.active : styles.inactive}>
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLanguage("fr")}>
        <Text style={language === "fr" ? styles.active : styles.inactive}>
          FR
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  active: {
    fontWeight: "bold",
    color: "#333",
  },
  inactive: {
    color: "#aaa",
  },
});
