import { useState, type PropsWithChildren } from "react";
import React from "react";

interface LanguageState {
  language: string;
  techInterview: boolean;
  questionsQuantity: number;
  loadedUserResume: string;
}

type LanguageContextType = [
  LanguageState,
  React.Dispatch<React.SetStateAction<LanguageState>>
];

export const mainContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

export const MainContext = ({ children }: PropsWithChildren) => {
  const state = useState<LanguageState>({
    language: "English",
    techInterview: false,
    questionsQuantity: 10,
    loadedUserResume: "",
  });
  return <mainContext.Provider value={state}>{children}</mainContext.Provider>;
};
