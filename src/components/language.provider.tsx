import { createContext, useContext, useState, useEffect } from "react";
import en from "./language/en.json";

const languagesText = {
  en,
};

type Language = "en" | "id";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: any;
  setTranslations: (translations: any) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  translations: languagesText["en"],
  setTranslations: () => null,
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "app-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );
  const [translations, setTranslations] = useState<any>(languagesText.en);

  useEffect(() => {
    localStorage.setItem(storageKey, language);
    setTranslations(languagesText[language as keyof typeof languagesText]);
  }, [language, storageKey]);

  return (
    <LanguageProviderContext.Provider
      value={{ language, setLanguage, translations, setTranslations }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
}

export const loadLanguage = (lang: Language) => {
  return languagesText[lang as keyof typeof languagesText];
};
