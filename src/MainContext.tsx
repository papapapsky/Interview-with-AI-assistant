import { useState, type PropsWithChildren } from "react";
import React from "react";

export type TypeMainParameters = {
  language: string;
  techInterview: boolean;
  questionsQuantity: number;
  loadedUserResume: string;
  interviewType: string;
};

type TypeParameterstContext = [
  TypeMainParameters,
  React.Dispatch<React.SetStateAction<TypeMainParameters>>
];

export const mainContext = React.createContext<
  TypeParameterstContext | undefined
>(undefined);

export const MainContext = ({ children }: PropsWithChildren) => {
  const state = useState<TypeMainParameters>(() => {
    const saved = localStorage.getItem("mainParameters");
    return saved
      ? JSON.parse(saved)
      : {
          language: "",
          techInterview: true,
          questionsQuantity: 10,
          loadedUserResume: "",
          interviewType: "fullInterview",
        };
  });

  return <mainContext.Provider value={state}>{children}</mainContext.Provider>;
};
