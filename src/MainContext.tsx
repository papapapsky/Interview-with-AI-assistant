import { useState, type PropsWithChildren } from "react";
import React from "react";

type TypeMainParameters = {
  language: string;
  techInterview: boolean;
  questionsQuantity: number;
  loadedUserResume: string;
};

type TypeParameterstContext = [
  TypeMainParameters,
  React.Dispatch<React.SetStateAction<TypeMainParameters>>
];

export const mainContext = React.createContext<
  TypeParameterstContext | undefined
>(undefined);

export const MainContext = ({ children }: PropsWithChildren) => {
  const state = useState<TypeMainParameters>({
    language: "",
    techInterview: true,
    questionsQuantity: 10,
    loadedUserResume: "",
  });
  return <mainContext.Provider value={state}>{children}</mainContext.Provider>;
};
