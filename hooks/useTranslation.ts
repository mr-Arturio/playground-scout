import { useState } from "react";
import { translations } from "@/constants/translations";

export const useTranslation = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const t = (key: keyof (typeof translations)["en"]) => translations[language][key];

  return { t, setLanguage, language };
};