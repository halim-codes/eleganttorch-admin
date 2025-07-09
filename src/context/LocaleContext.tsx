"use client";

import { createContext, useContext, useState, useEffect } from "react";

type LocaleContextType = {
  locale: string;
  messages: Record<string, string>;
  setLocale: (locale: string) => void;
  isHydrated: boolean;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState("ar");
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          setLocale(user.lang || "ar");
        }
      } catch (error) {
        console.error("Failed to load locale from localStorage:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    import(`@/locales/${locale}.json`).then((mod) => setMessages(mod.default));
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages, isHydrated }}>
      {isHydrated ? children : null}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
};
