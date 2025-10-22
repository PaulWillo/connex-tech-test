import { createContext, useContext, ReactNode } from "react";
import language from "../../../webapp/config/language.json"

export const LanguageContext = createContext(language);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);