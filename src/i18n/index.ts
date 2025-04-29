import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import pt from "./pt.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: "pt", // idioma padrão
  fallbackLng: "en", // se não encontrar, usa inglês
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
