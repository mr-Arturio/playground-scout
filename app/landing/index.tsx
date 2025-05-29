import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <ImageBackground
      // source={require("@/assets/images/map-background.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{t("appTitle")}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("findPlaygrounds")}</Text>
        </TouchableOpacity>
        <LanguageSwitcher />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#A1CEDC"
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  overlay: {
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
